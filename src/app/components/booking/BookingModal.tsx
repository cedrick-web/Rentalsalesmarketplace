import { Calendar as CalendarIcon, Shield, CreditCard, MapPin, FileText, CheckCircle2, AlertCircle } from 'lucide-react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog';
import { Button } from '../ui/button';
import { Calendar } from '../ui/calendar';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Separator } from '../ui/separator';
import { Badge } from '../ui/badge';
import { ScrollArea } from '../ui/scroll-area';
import { Checkbox } from '../ui/checkbox';
import { Product } from '../../../types';
import { toast } from 'sonner';

interface BookingModalProps {
  product: Product;
  viewMode: 'rent' | 'buy';
  isOpen: boolean;
  onClose: () => void;
}

export function BookingModal({ product, viewMode, isOpen, onClose }: BookingModalProps) {
  const { t } = useTranslation();
  const [step, setStep] = useState(1);
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [notes, setNotes] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | null>(null);

  const price = viewMode === 'rent' ? product.rentPrice : product.buyPrice;
  if (!price) return null;

  const calculateDays = () => {
    if (!startDate || !endDate) return 1;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const days = calculateDays();
  const subtotal = price * (viewMode === 'rent' ? days : 1);
  const platformFee = Math.round(subtotal * 0.1);
  const deposit = viewMode === 'rent' ? (product.deposit || 0) : 0;
  const total = subtotal + platformFee + deposit;

  const handleConfirmBooking = () => {
    if (!paymentMethod) {
      toast.error('Hitamo uburyo bwo kwishyura!');
      return;
    }

    toast.success('Booking yemewe!', {
      description: `Uzakira ubutumwa kuri ${paymentMethod === 'momo' ? 'MTN Mobile Money' : 'Airtel Money'}`,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>
            {viewMode === 'rent' ? t('bookNow') : t('buy')} - {product.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-full">
          <div className="p-6 space-y-6">
            {/* Progress Steps */}
            <div className="flex items-center justify-between">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                      step >= s ? 'bg-primary text-primary-foreground' : 'bg-secondary'
                    }`}
                  >
                    {step > s ? <CheckCircle2 className="h-4 w-4" /> : s}
                  </div>
                  {s < 3 && (
                    <div className={`flex-1 h-1 mx-2 ${step > s ? 'bg-primary' : 'bg-secondary'}`} />
                  )}
                </div>
              ))}
            </div>

            {/* Step 1: Select Dates (Rent only) */}
            {step === 1 && viewMode === 'rent' && (
              <div className="space-y-4">
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <CalendarIcon className="h-4 w-4" />
                    {t('selectDates')}
                  </Label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-xs text-muted-foreground">Itariki yo gutangira</Label>
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                        className="rounded-md border mt-1"
                      />
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Itariki yo gurangiza</Label>
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => date < (startDate || new Date())}
                        className="rounded-md border mt-1"
                      />
                    </div>
                  </div>
                  {startDate && endDate && (
                    <p className="text-sm text-muted-foreground mt-2">
                      Iminsi: <span className="font-bold text-primary">{days}</span>
                    </p>
                  )}
                </div>
                <Button
                  onClick={() => setStep(2)}
                  disabled={!startDate || !endDate}
                  className="w-full"
                >
                  Komeza
                </Button>
              </div>
            )}

            {/* Step 1: Skip for Buy */}
            {step === 1 && viewMode === 'buy' && (
              <Button onClick={() => setStep(2)} className="w-full">
                Komeza kugura
              </Button>
            )}

            {/* Step 2: Delivery & Agreement */}
            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="address" className="flex items-center gap-2">
                    <MapPin className="h-4 w-4" />
                    {t('deliveryAddress')}
                  </Label>
                  <Input
                    id="address"
                    placeholder="KG 123 Ave, Kigali"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="notes">Notes (optional)</Label>
                  <Textarea
                    id="notes"
                    placeholder="Andika inyongera ubishaka..."
                    rows={3}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Separator />

                {/* Rental Agreement */}
                <div className="bg-secondary/30 p-4 rounded-lg space-y-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h4 className="font-bold">Amasezerano</h4>
                  </div>
                  <ScrollArea className="h-32 text-sm text-muted-foreground">
                    <p className="whitespace-pre-line">
                      {`1. Umukiriya agomba gutanga ingwate (deposit) mbere y'uko ahabwa ikintu.
2. Ikintu kigomba gusubizwa mu gihe cyagenwe, bitakorwa hazabaho igihano.
3. Umuntu asubiza ikintu cyangiritse azishyura.
4. Amafaranga aguma muri Escrow kugeza ikintu kigarutse kizima.
5. Iyo hari amakimbirane, admin azayakemura mu minsi 5.
6. Platform ifata commission ya 10% ku buryo bwose.
7. Umuntu agomba kwemeza ko yahawe ikintu akoresheje QR Code.
8. Ntakwishyura amafaranga igihe ikintu kitagarushije.`}
                    </p>
                  </ScrollArea>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm cursor-pointer">
                      Nemeye amasezerano yose yo gukodesha
                    </Label>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                    Subira inyuma
                  </Button>
                  <Button
                    onClick={() => setStep(3)}
                    disabled={!deliveryAddress || !agreedToTerms}
                    className="flex-1"
                  >
                    Komeza
                  </Button>
                </div>
              </div>
            )}

            {/* Step 3: Payment */}
            {step === 3 && (
              <div className="space-y-4">
                {/* Price Breakdown */}
                <div className="bg-secondary/30 p-4 rounded-lg space-y-2">
                  <h4 className="font-bold mb-2">Igiciro cyose</h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span>{viewMode === 'rent' ? `${price.toLocaleString()} RWF x ${days} iminsi` : 'Igiciro'}</span>
                      <span>{subtotal.toLocaleString()} RWF</span>
                    </div>
                    <div className="flex justify-between text-muted-foreground">
                      <span>Platform fee (10%)</span>
                      <span>{platformFee.toLocaleString()} RWF</span>
                    </div>
                    {deposit > 0 && (
                      <div className="flex justify-between text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Shield className="h-3 w-3" />
                          Ingwate
                        </span>
                        <span>{deposit.toLocaleString()} RWF</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg text-primary">
                      <span>Total</span>
                      <span>{total.toLocaleString()} RWF</span>
                    </div>
                  </div>
                </div>

                {/* Escrow Status */}
                <div className="bg-primary/10 p-4 rounded-lg flex items-start gap-3">
                  <Shield className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <div className="text-sm">
                    <p className="font-bold mb-1">Escrow System yakingiwe</p>
                    <p className="text-muted-foreground">
                      Amafaranga yawe azaguma muri system kugeza ikintu kigezeho kandi wemeje. 
                      Uko bikorwa birongorera umugurisha n'umuguzi.
                    </p>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <Label className="flex items-center gap-2 mb-2">
                    <CreditCard className="h-4 w-4" />
                    {t('paymentMethod')}
                  </Label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => setPaymentMethod('momo')}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        paymentMethod === 'momo'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-bold text-yellow-600 mb-1">MTN MoMo</div>
                      <div className="text-xs text-muted-foreground">Mobile Money</div>
                    </button>
                    <button
                      onClick={() => setPaymentMethod('airtel')}
                      className={`p-4 border-2 rounded-lg text-center transition-all ${
                        paymentMethod === 'airtel'
                          ? 'border-primary bg-primary/10'
                          : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="font-bold text-red-600 mb-1">Airtel Money</div>
                      <div className="text-xs text-muted-foreground">Mobile Money</div>
                    </button>
                  </div>
                </div>

                {paymentMethod && (
                  <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm">
                      <p className="font-bold text-yellow-900 dark:text-yellow-100 mb-1">
                        Menya
                      </p>
                      <p className="text-yellow-800 dark:text-yellow-200">
                        Uzakira ubutumwa bwo kwishyura kuri telefone yawe. 
                        Andika code ya PIN yawe kugira ngo wishyure.
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setStep(2)} className="flex-1">
                    Subira inyuma
                  </Button>
                  <Button
                    onClick={handleConfirmBooking}
                    disabled={!paymentMethod}
                    className="flex-1"
                  >
                    <CheckCircle2 className="h-4 w-4 mr-2" />
                    Emeza Kwishyura
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
