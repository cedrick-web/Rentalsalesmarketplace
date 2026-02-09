import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Camera, Upload, MapPin, Building, CheckCircle, AlertCircle,
  FileText, User, CreditCard, Clock, Shield
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { toast } from 'sonner';

export function SellerVerificationPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    documentType: '',
    documentNumber: '',
    documentFile: null as File | null,
    selfieFile: null as File | null,
    businessName: '',
    businessAddress: '',
    gpsLocation: { lat: 0, lng: 0 },
    phoneNumber: '',
    email: '',
  });
  const [verificationStatus, setVerificationStatus] = useState<'not_submitted' | 'pending' | 'approved' | 'rejected'>('not_submitted');

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleFileChange = (field: 'documentFile' | 'selfieFile', file: File | null) => {
    setFormData(prev => ({ ...prev, [field]: file }));
  };

  const captureGPS = () => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setFormData(prev => ({
            ...prev,
            gpsLocation: {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            },
          }));
          toast.success(t('verification.gpsSuccess'));
        },
        () => {
          toast.error(t('verification.gpsError'));
        }
      );
    } else {
      toast.error(t('verification.gpsNotSupported'));
    }
  };

  const handleSubmit = () => {
    setVerificationStatus('pending');
    toast.success(t('verification.submitted'));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.documentType && formData.documentNumber && formData.documentFile;
      case 2:
        return formData.selfieFile;
      case 3:
        return formData.phoneNumber && formData.email;
      case 4:
        return true;
      default:
        return false;
    }
  };

  if (verificationStatus === 'pending') {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Clock className="w-24 h-24 text-yellow-500 mb-6 animate-pulse" />
            <h2 className="text-2xl font-bold mb-2">{t('verification.pending')}</h2>
            <p className="text-muted-foreground text-center mb-4">
              {t('verification.pendingDescription')}
            </p>
            <Badge className="bg-yellow-500/20 text-yellow-700 dark:text-yellow-400">
              {t('verification.reviewing')}
            </Badge>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (verificationStatus === 'approved') {
    return (
      <div className="container mx-auto px-4 py-6 max-w-2xl">
        <Card className="border-green-500">
          <CardContent className="flex flex-col items-center justify-center py-12">
            <CheckCircle className="w-24 h-24 text-green-500 mb-6" />
            <h2 className="text-2xl font-bold mb-2">{t('verification.approved')}</h2>
            <p className="text-muted-foreground text-center mb-4">
              {t('verification.approvedDescription')}
            </p>
            <Button>{t('verification.startSelling')}</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-3xl mx-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">{t('verification.becomeVerifiedSeller')}</h1>
          <p className="text-muted-foreground">{t('verification.description')}</p>
        </div>

        {/* Progress */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">
                {t('verification.step')} {step} {t('common.of')} {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardContent>
        </Card>

        {/* Step Content */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5" />
                {t('verification.identityDocument')}
              </CardTitle>
              <CardDescription>{t('verification.step1Description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="docType">{t('verification.documentType')}</Label>
                <Select
                  value={formData.documentType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, documentType: value }))}
                >
                  <SelectTrigger id="docType" className="mt-2">
                    <SelectValue placeholder={t('verification.selectDocType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national_id">{t('verification.nationalID')}</SelectItem>
                    <SelectItem value="passport">{t('verification.passport')}</SelectItem>
                    <SelectItem value="drivers_license">{t('verification.driversLicense')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="docNumber">{t('verification.documentNumber')}</Label>
                <Input
                  id="docNumber"
                  placeholder="1234567890123456"
                  value={formData.documentNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, documentNumber: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label>{t('verification.uploadDocument')}</Label>
                <div className="mt-2 border-2 border-dashed rounded-lg p-8 text-center hover:border-[#1a4d2e] transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange('documentFile', e.target.files?.[0] || null)}
                    className="hidden"
                    id="docFile"
                  />
                  <label htmlFor="docFile" className="cursor-pointer">
                    {formData.documentFile ? (
                      <div className="flex flex-col items-center">
                        <CheckCircle className="w-12 h-12 text-green-500 mb-2" />
                        <p className="font-medium">{formData.documentFile.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {(formData.documentFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center">
                        <Upload className="w-12 h-12 text-muted-foreground mb-2" />
                        <p className="font-medium">{t('verification.clickToUpload')}</p>
                        <p className="text-sm text-muted-foreground">{t('verification.maxSize')}</p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
                <div className="flex gap-3">
                  <Shield className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-sm">{t('verification.securityNote')}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('verification.securityDescription')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="w-5 h-5" />
                {t('verification.selfieVerification')}
              </CardTitle>
              <CardDescription>{t('verification.step2Description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <h4 className="font-semibold text-sm mb-2">{t('verification.selfieInstructions')}</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>• {t('verification.holdDocument')}</li>
                  <li>• {t('verification.clearPhoto')}</li>
                  <li>• {t('verification.goodLighting')}</li>
                  <li>• {t('verification.faceClear')}</li>
                </ul>
              </div>

              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-[#1a4d2e] transition-colors cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(e) => handleFileChange('selfieFile', e.target.files?.[0] || null)}
                  className="hidden"
                  id="selfieFile"
                />
                <label htmlFor="selfieFile" className="cursor-pointer">
                  {formData.selfieFile ? (
                    <div className="flex flex-col items-center">
                      <img
                        src={URL.createObjectURL(formData.selfieFile)}
                        alt="Selfie preview"
                        className="w-48 h-48 object-cover rounded-lg mb-4"
                      />
                      <p className="font-medium">{formData.selfieFile.name}</p>
                      <Button variant="outline" className="mt-2" size="sm">
                        {t('verification.retake')}
                      </Button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <Camera className="w-16 h-16 text-muted-foreground mb-4" />
                      <p className="font-medium">{t('verification.takeSelfie')}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {t('verification.orUploadPhoto')}
                      </p>
                    </div>
                  )}
                </label>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building className="w-5 h-5" />
                {t('verification.businessInfo')}
              </CardTitle>
              <CardDescription>{t('verification.step3Description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="phone">{t('verification.phoneNumber')}</Label>
                <Input
                  id="phone"
                  placeholder="078XXXXXXX"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData(prev => ({ ...prev, phoneNumber: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="email">{t('verification.email')}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="businessName">{t('verification.businessName')} ({t('common.optional')})</Label>
                <Input
                  id="businessName"
                  placeholder={t('verification.businessNamePlaceholder')}
                  value={formData.businessName}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessName: e.target.value }))}
                  className="mt-2"
                />
              </div>

              <div>
                <Label htmlFor="businessAddress">{t('verification.businessAddress')} ({t('common.optional')})</Label>
                <Textarea
                  id="businessAddress"
                  placeholder={t('verification.businessAddressPlaceholder')}
                  value={formData.businessAddress}
                  onChange={(e) => setFormData(prev => ({ ...prev, businessAddress: e.target.value }))}
                  className="mt-2"
                  rows={3}
                />
              </div>

              <div>
                <Label>{t('verification.gpsLocation')} ({t('common.optional')})</Label>
                <div className="mt-2 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={captureGPS}
                    className="flex-1"
                  >
                    <MapPin className="w-4 h-4 mr-2" />
                    {formData.gpsLocation.lat !== 0
                      ? t('verification.locationCaptured')
                      : t('verification.captureLocation')}
                  </Button>
                  {formData.gpsLocation.lat !== 0 && (
                    <CheckCircle className="w-6 h-6 text-green-500" />
                  )}
                </div>
                {formData.gpsLocation.lat !== 0 && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {formData.gpsLocation.lat.toFixed(6)}, {formData.gpsLocation.lng.toFixed(6)}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                {t('verification.reviewSubmit')}
              </CardTitle>
              <CardDescription>{t('verification.step4Description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{t('verification.identityDocument')}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t(`verification.${formData.documentType}`)} - {formData.documentNumber}
                    </p>
                    {formData.documentFile && (
                      <p className="text-xs text-muted-foreground mt-1">
                        {formData.documentFile.name}
                      </p>
                    )}
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <Camera className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{t('verification.selfieVerification')}</h4>
                    {formData.selfieFile && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {formData.selfieFile.name}
                      </p>
                    )}
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>

                <div className="flex items-start gap-4 p-4 bg-muted rounded-lg">
                  <User className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">{t('verification.contactInfo')}</h4>
                    <p className="text-sm text-muted-foreground mt-1">{formData.phoneNumber}</p>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500" />
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-950/20 p-4 rounded-lg">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-sm">{t('verification.depositRequired')}</h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {t('verification.depositDescription')}
                    </p>
                    <p className="text-lg font-bold text-[#1a4d2e] mt-2">50,000 RWF</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('verification.depositRefundable')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <Card className="mt-6">
          <CardContent className="flex justify-between p-6">
            <Button
              variant="outline"
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
            >
              {t('common.back')}
            </Button>
            {step < totalSteps ? (
              <Button
                onClick={() => setStep(Math.min(totalSteps, step + 1))}
                disabled={!canProceed()}
              >
                {t('common.continue')}
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-[#1a4d2e] hover:bg-[#153d25]"
              >
                {t('verification.submit')}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
