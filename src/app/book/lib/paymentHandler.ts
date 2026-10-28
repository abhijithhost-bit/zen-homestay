/**
 * Pluggable Payment Architecture for Zen Homestay Checkout
 * 
 * Phase 1: Host Direct Approval & UPI Confirmation via WhatsApp (active)
 * Phase 2: Modular Razorpay Gateway SDK + Webhook verification (pluggable drop-in)
 */

export interface PaymentProcessParams {
  bookingRef: string;
  amountInRupees: number;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
}

export interface PaymentResult {
  success: boolean;
  paymentId?: string;
  orderId?: string;
  message?: string;
}

export interface PaymentHandler {
  id: string;
  displayName: string;
  processPayment: (params: PaymentProcessParams) => Promise<PaymentResult>;
}

/**
 * Phase 1: Host Direct Approval & UPI Confirmation
 * Resolves immediately so that the ticket can be dispatched to WhatsApp
 * and the confirmation receipt displayed on screen.
 */
export const whatsAppDirectPaymentHandler: PaymentHandler = {
  id: 'whatsapp-direct',
  displayName: 'Host Direct Approval & UPI Confirmation',
  processPayment: async (): Promise<PaymentResult> => {
    // In Phase 1, booking request is dispatched to host Abhijith via WhatsApp
    // Host confirms availability and shares direct UPI QR code or bank transfer.
    return {
      success: true,
      message: 'Direct host booking request initiated',
    };
  },
};

/**
 * Phase 2 Blueprint (Dormant until NEXT_PUBLIC_RAZORPAY_KEY_ID is provided)
 * 
 * When Razorpay is activated:
 * 1. Define NEXT_PUBLIC_RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET in .env.local
 * 2. Create Next.js API route `/api/razorpay/order` to generate order_id server-side
 * 3. Mount Razorpay Checkout modal inside /book
 * 4. Verify payment signature and mark booking confirmed
 */
export const createRazorpayPaymentHandler = (razorpayKeyId?: string): PaymentHandler => {
  return {
    id: 'razorpay-gateway',
    displayName: 'Razorpay Instant UPI & Cards',
    processPayment: async (_params: PaymentProcessParams): Promise<PaymentResult> => {
      if (!razorpayKeyId) {
        console.warn('Razorpay Key ID not configured. Falling back to WhatsApp Direct.');
        return whatsAppDirectPaymentHandler.processPayment(_params);
      }
      // Future Phase 2 implementation hook
      return {
        success: false,
        message: 'Razorpay integration pending key configuration.',
      };
    },
  };
};

// Export the active handler (defaults to Phase 1 WhatsApp Direct)
export const activePaymentHandler: PaymentHandler = whatsAppDirectPaymentHandler;

