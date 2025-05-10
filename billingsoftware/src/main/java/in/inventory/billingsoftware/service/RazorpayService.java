package in.inventory.billingsoftware.service;

import com.razorpay.RazorpayException;
import in.inventory.billingsoftware.io.RazorpayOrderResponse;

public interface RazorpayService {

    RazorpayOrderResponse createOrder(Double amount, String currency) throws RazorpayException;
}
