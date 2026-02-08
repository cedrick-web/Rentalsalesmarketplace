import { Upload, X, DollarSign, MapPin, Info, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

export function AddListingPage() {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [images, setImages] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    condition: '',
    rentPrice: '',
    buyPrice: '',
    deposit: '',
    location: '',
    features: '',
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Mock image upload
    const files = Array.from(e.target.files || []);
    const mockImages = files.map(() => 
      `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop`
    );
    setImages(prev => [...prev, ...mockImages]);
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    toast.success('Ikintu cyawe cyashyizweho neza!', {
      description: 'Kizajya kibonekana mu saa imwe',
    });
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      condition: '',
      rentPrice: '',
      buyPrice: '',
      deposit: '',
      location: '',
      features: '',
    });
    setImages([]);
    setStep(1);
  };

  return (
    <div className="container mx-auto px-4 py-6 max-w-3xl">
      <Card>
        <CardHeader>
          <CardTitle>Shyiraho ikintu gishya</CardTitle>
          <CardDescription>
            Uzuza amakuru y'ikintu ushaka gukodesha cyangwa kugurisha
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                  }`}
                >
                  {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
                </div>
                {s < 3 && (
                  <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-secondary'}`} />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Images */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <Label>Amafoto y'ikintu</Label>
                <div className="mt-2 grid grid-cols-3 gap-4">
                  {images.map((img, index) => (
                    <div key={index} className="relative aspect-square rounded-lg overflow-hidden border">
                      <img src={img} alt={`Upload ${index + 1}`} className="w-full h-full object-cover" />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute top-2 right-2 h-6 w-6"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  <label className="aspect-square border-2 border-dashed rounded-lg flex flex-col items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
                    <Upload className="h-8 w-8 text-muted-foreground mb-2" />
                    <span className="text-sm text-muted-foreground">Shyiraho</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Shyiraho nibura amafoto 3. Ifoto ya mbere izaba cover.
                </p>
              </div>
              <Button onClick={() => setStep(2)} disabled={images.length < 1} className="w-full">
                Komeza
              </Button>
            </div>
          )}

          {/* Step 2: Details */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="title">Izina ry'ikintu</Label>
                <Input
                  id="title"
                  placeholder="Urugero: Toyota RAV4 2023"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="description">Ibisobanuro</Label>
                <Textarea
                  id="description"
                  placeholder="Sobanura ikintu cyawe..."
                  rows={4}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Icyiciro</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hitamo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="vehicles">{t('vehicles')}</SelectItem>
                      <SelectItem value="electronics">{t('electronics')}</SelectItem>
                      <SelectItem value="clothing">{t('clothing')}</SelectItem>
                      <SelectItem value="houses">{t('houses')}</SelectItem>
                      <SelectItem value="furniture">{t('furniture')}</SelectItem>
                      <SelectItem value="tools">{t('tools')}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Uko kimeze</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({ ...formData, condition: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Hitamo..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">Gishya</SelectItem>
                      <SelectItem value="like-new">Nk'igishya</SelectItem>
                      <SelectItem value="good">Nziza</SelectItem>
                      <SelectItem value="fair">Isanzwe</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="features">Ibimenyetso (byitandukanijwe na comma)</Label>
                <Input
                  id="features"
                  placeholder="GPS, Air Conditioning, Automatic"
                  value={formData.features}
                  onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                />
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Subira inyuma
                </Button>
                <Button onClick={() => setStep(3)} className="flex-1">
                  Komeza
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Pricing */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="location">Aho iherereye</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Kigali, Gasabo"
                    className="pl-10"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="rentPrice">Igiciro cyo gukodesha (ku munsi)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="rentPrice"
                    type="number"
                    placeholder="50000"
                    className="pl-10"
                    value={formData.rentPrice}
                    onChange={(e) => setFormData({ ...formData, rentPrice: e.target.value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">RWF</p>
              </div>

              <div>
                <Label htmlFor="buyPrice">Igiciro cyo kugura (optional)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="buyPrice"
                    type="number"
                    placeholder="2500000"
                    className="pl-10"
                    value={formData.buyPrice}
                    onChange={(e) => setFormData({ ...formData, buyPrice: e.target.value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">RWF</p>
              </div>

              <div>
                <Label htmlFor="deposit">Ingwate (Security Deposit)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="deposit"
                    type="number"
                    placeholder="100000"
                    className="pl-10"
                    value={formData.deposit}
                    onChange={(e) => setFormData({ ...formData, deposit: e.target.value })}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Amafaranga umuntu atanga nk'ingwate, azasubizwa ikintu kigarutse
                </p>
              </div>

              <div className="bg-secondary/30 p-4 rounded-lg">
                <div className="flex items-start gap-2">
                  <Info className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold mb-1">Menya:</p>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>System ifata 10% commission ku muntu wacyo gukodesha</li>
                      <li>Amafaranga aguma muri Escrow kugeza ikintu kigarutse</li>
                      <li>Ingwate izasubizwa ikintu kidahari icyangiritse</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                  Subira inyuma
                </Button>
                <Button onClick={handleSubmit} className="flex-1">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Ohereza
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
