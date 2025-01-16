
# @types/paytab_p2

A TypeScript library for managing payment integrations, including creating payment pages, validating payments, and querying transactions. This library is designed to work seamlessly with Paytabs or similar payment processing services.

---

## Installation

Install the library via npm:

```bash
npm install @types/paytab_p2
```

---

## Configuration

Before using any features, configure the library with your merchant credentials:

```typescript
import { setConfig } from '@types/paytab_p2';

setConfig('your-merchant-id', 'your-server-key', 'region');
```

### Parameters
- `merchantId`: Your unique merchant ID provided by Paytabs.
- `serverKey`: The server key for authentication.
- `region`: The region associated with your account.

---

## Features

### 1. Create Payment Page

Generate a payment page for customers by passing the required parameters.

```typescript
import { createPaymentPage } from '@types/paytab_p2';

const paymentParams = {
    payment_code: {
        payment_methods: ['creditcard', 'applepay']
    },
    transaction: {
        tran_type: 'sale',
        tran_class: 'ecom'
    },
    cart: {
        cart_id: 'cart123',
        cart_currency: 'USD',
        cart_amount: 100.5,
        cart_description: 'Payment for Order #123'
    },
    customer: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        street1: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'US',
        zip: '10001',
        ip: '127.0.0.1'
    },
    shipping: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        phone: '1234567890',
        street1: '123 Main St',
        city: 'New York',
        state: 'NY',
        country: 'US',
        zip: '10001',
        ip: '127.0.0.1'
    },
    urls: {
        callback: 'https://example.com/callback',
        return_url: 'https://example.com/return'
    },
    lang: 'en',
    callbackFunction: (response) => {
        console.log('Payment Response:', response);
    },
    framed: false
};

createPaymentPage(paymentParams);
```

#### Parameters
- **`payment_code`**: Object specifying payment methods (e.g., `['creditcard']`).
- **`transaction`**: Details of the transaction (type, class, etc.).
- **`cart`**: Cart details (ID, currency, amount, description).
- **`customer`**: Customer details (name, email, address, etc.).
- **`shipping`**: Shipping details (name, email, address, etc.).
- **`urls`**: Callback and return URLs.
- **`lang`**: Language code (e.g., `en`, `ar`).
- **`callbackFunction`**: Function executed after the payment.
- **`framed`**: Boolean indicating if the payment page should be framed.

---

### 2. Validate Payment

Validate a payment using the transaction reference.

```typescript
import { validatePayment } from '@types/paytab_p2';

validatePayment({
    tran_ref: 'transaction-reference',
    callback: (response) => {
        console.log('Validation Response:', response);
    }
});
```

#### Parameters
- **`tran_ref`**: The transaction reference to validate.
- **`callback`**: A function executed after validation.

---

### 3. Query Transaction

Query a transaction to retrieve its status and details.

```typescript
import { queryTransaction } from '@types/paytab_p2';

queryTransaction({
    transaction: {
        tran_type: 'sale',
        tran_class: 'ecom'
    },
    cart: {
        cart_id: 'cart123',
        cart_currency: 'USD',
        cart_amount: 100.5,
        cart_description: 'Payment for Order #123'
    },
    callback: (response) => {
        console.log('Transaction Query Response:', response);
    }
});
```

#### Parameters
- **`transaction`**: Transaction details (type, class, etc.).
- **`cart`**: Cart details (ID, currency, amount, description).
- **`callback`**: A function executed after querying the transaction.

---

## License

This library is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contribution

Contributions are welcome! Feel free to open issues or submit pull requests on the [GitHub repository](https://github.com/GhaziRiyadh).

---

## Support

For issues or questions, please contact [ghaziriyadh2@gmail.com](mailto:ghaziriyadh2@gmail.com).

