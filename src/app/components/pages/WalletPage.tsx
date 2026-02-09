import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Wallet, Plus, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, XCircle, CreditCard, Smartphone, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  description: string;
  date: Date;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  reference: string;
}

export function WalletPage() {
  const { t } = useTranslation();
  const [balance, setBalance] = useState(450000);
  const [topUpAmount, setTopUpAmount] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('mtn');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: 'TRX001',
      type: 'credit',
      amount: 500000,
      description: 'Wallet Top-up via MTN Mobile Money',
      date: new Date(2024, 1, 8),
      status: 'completed',
      paymentMethod: 'MTN',
      reference: 'MTN2024020812345'
    },
    {
      id: 'TRX002',
      type: 'debit',
      amount: 250000,
      description: 'Booking Payment - Toyota RAV4 Rental',
      date: new Date(2024, 1, 7),
      status: 'completed',
      paymentMethod: 'Wallet',
      reference: 'BKG20240207001'
    },
    {
      id: 'TRX003',
      type: 'credit',
      amount: 200000,
      description: 'Refund - Cancelled Booking #12345',
      date: new Date(2024, 1, 6),
      status: 'completed',
      paymentMethod: 'Wallet',
      reference: 'REF20240206001'
    },
    {
      id: 'TRX004',
      type: 'debit',
      amount: 150000,
      description: 'Booking Payment - MacBook Pro Rental',
      date: new Date(2024, 1, 5),
      status: 'completed',
      paymentMethod: 'Wallet',
      reference: 'BKG20240205002'
    },
    {
      id: 'TRX005',
      type: 'credit',
      amount: 300000,
      description: 'Wallet Top-up via Airtel Money',
      date: new Date(2024, 1, 4),
      status: 'completed',
      paymentMethod: 'Airtel',
      reference: 'ATL2024020456789'
    }
  ]);

  const handleTopUp = async () => {
    const amount = parseInt(topUpAmount);
    if (!amount || amount < 1000) {
      toast.error(t('wallet.minAmount'));
      return;
    }
    if (!phoneNumber) {
      toast.error(t('wallet.enterPhone'));
      return;
    }

    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `TRX${Date.now()}`,
        type: 'credit',
        amount: amount,
        description: `Wallet Top-up via ${paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} Mobile Money`,
        date: new Date(),
        status: 'completed',
        paymentMethod: paymentMethod.toUpperCase(),
        reference: `${paymentMethod.toUpperCase()}${Date.now()}`
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(prev => prev + amount);
      setTopUpAmount('');
      setPhoneNumber('');
      setIsProcessing(false);
      toast.success(t('wallet.topUpSuccess'));
    }, 2000);
  };

  const handleWithdraw = async () => {
    const amount = parseInt(withdrawAmount);
    if (!amount || amount < 5000) {
      toast.error(t('wallet.minWithdraw'));
      return;
    }
    if (amount > balance) {
      toast.error(t('wallet.insufficientBalance'));
      return;
    }
    if (!phoneNumber) {
      toast.error(t('wallet.enterPhone'));
      return;
    }

    setIsProcessing(true);
    
    // Simulate withdrawal processing
    setTimeout(() => {
      const newTransaction: Transaction = {
        id: `TRX${Date.now()}`,
        type: 'debit',
        amount: amount,
        description: `Withdrawal to ${paymentMethod === 'mtn' ? 'MTN' : 'Airtel'} Mobile Money`,
        date: new Date(),
        status: 'completed',
        paymentMethod: paymentMethod.toUpperCase(),
        reference: `WTH${Date.now()}`
      };
      
      setTransactions(prev => [newTransaction, ...prev]);
      setBalance(prev => prev - amount);
      setWithdrawAmount('');
      setPhoneNumber('');
      setIsProcessing(false);
      toast.success(t('wallet.withdrawSuccess'));
    }, 2000);
  };

  const getTransactionIcon = (type: string, status: string) => {
    if (status === 'pending') return <Clock className="w-5 h-5 text-yellow-500" />;
    if (status === 'failed') return <XCircle className="w-5 h-5 text-red-500" />;
    if (type === 'credit') return <ArrowDownLeft className="w-5 h-5 text-green-500" />;
    return <ArrowUpRight className="w-5 h-5 text-red-500" />;
  };

  const quickAmounts = [10000, 20000, 50000, 100000];

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{t('wallet.title')}</h1>
        <p className="text-muted-foreground">{t('wallet.description')}</p>
      </div>

      {/* Balance Card */}
      <Card className="mb-6 bg-gradient-to-br from-[#1a4d2e] to-[#2d5a3d] text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Wallet className="w-6 h-6" />
            {t('wallet.availableBalance')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-5xl font-bold mb-4">{balance.toLocaleString()} RWF</p>
          <div className="flex gap-3">
            <Dialog>
              <DialogTrigger asChild>
                <Button className="bg-white text-[#1a4d2e] hover:bg-gray-100">
                  <Plus className="w-4 h-4 mr-2" />
                  {t('wallet.topUp')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('wallet.topUp')}</DialogTitle>
                  <DialogDescription>{t('wallet.topUpDescription')}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label>{t('wallet.selectMethod')}</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="mtn" id="mtn" />
                        <Label htmlFor="mtn" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 text-yellow-500" />
                          <span>MTN Mobile Money</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="airtel" id="airtel" />
                        <Label htmlFor="airtel" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 text-red-500" />
                          <span>Airtel Money</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="phone">{t('wallet.phoneNumber')}</Label>
                    <Input
                      id="phone"
                      placeholder="078XXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount">{t('wallet.amount')}</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="10000"
                      value={topUpAmount}
                      onChange={(e) => setTopUpAmount(e.target.value)}
                      className="mt-2"
                    />
                    <div className="flex gap-2 mt-2">
                      {quickAmounts.map((amt) => (
                        <Button
                          key={amt}
                          variant="outline"
                          size="sm"
                          onClick={() => setTopUpAmount(amt.toString())}
                        >
                          {amt.toLocaleString()}
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setTopUpAmount('')}>
                    {t('common.cancel')}
                  </Button>
                  <Button onClick={handleTopUp} disabled={isProcessing}>
                    {isProcessing ? t('wallet.processing') : t('wallet.topUp')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                  <ArrowUpRight className="w-4 h-4 mr-2" />
                  {t('wallet.withdraw')}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t('wallet.withdraw')}</DialogTitle>
                  <DialogDescription>{t('wallet.withdrawDescription')}</DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">{t('wallet.availableBalance')}</p>
                    <p className="text-2xl font-bold">{balance.toLocaleString()} RWF</p>
                  </div>
                  <div>
                    <Label>{t('wallet.selectMethod')}</Label>
                    <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="mt-2">
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="mtn" id="mtn-w" />
                        <Label htmlFor="mtn-w" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 text-yellow-500" />
                          <span>MTN Mobile Money</span>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-lg p-3 cursor-pointer hover:bg-accent">
                        <RadioGroupItem value="airtel" id="airtel-w" />
                        <Label htmlFor="airtel-w" className="flex items-center gap-2 cursor-pointer flex-1">
                          <Smartphone className="w-5 h-5 text-red-500" />
                          <span>Airtel Money</span>
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <div>
                    <Label htmlFor="phone-w">{t('wallet.phoneNumber')}</Label>
                    <Input
                      id="phone-w"
                      placeholder="078XXXXXXX"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      className="mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="amount-w">{t('wallet.amount')}</Label>
                    <Input
                      id="amount-w"
                      type="number"
                      placeholder="5000"
                      value={withdrawAmount}
                      onChange={(e) => setWithdrawAmount(e.target.value)}
                      className="mt-2"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      {t('wallet.minWithdrawInfo')}
                    </p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setWithdrawAmount('')}>
                    {t('common.cancel')}
                  </Button>
                  <Button onClick={handleWithdraw} disabled={isProcessing}>
                    {isProcessing ? t('wallet.processing') : t('wallet.withdraw')}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>{t('wallet.transactionHistory')}</CardTitle>
          <CardDescription>{t('wallet.transactionDescription')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {transactions.length === 0 ? (
              <div className="text-center py-12">
                <Wallet className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">{t('wallet.noTransactions')}</p>
              </div>
            ) : (
              transactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-muted rounded-full">
                      {getTransactionIcon(transaction.type, transaction.status)}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-sm text-muted-foreground">
                          {transaction.date.toLocaleDateString()}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {transaction.paymentMethod}
                        </Badge>
                        <Badge
                          className={
                            transaction.status === 'completed'
                              ? 'bg-green-500/20 text-green-700 dark:text-green-400'
                              : transaction.status === 'pending'
                              ? 'bg-yellow-500/20 text-yellow-700 dark:text-yellow-400'
                              : 'bg-red-500/20 text-red-700 dark:text-red-400'
                          }
                        >
                          {t(`status.${transaction.status}`)}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ref: {transaction.reference}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`text-lg font-semibold ${
                        transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                      }`}
                    >
                      {transaction.type === 'credit' ? '+' : '-'}
                      {transaction.amount.toLocaleString()} RWF
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
