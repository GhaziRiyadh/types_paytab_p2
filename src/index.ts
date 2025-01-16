/**
 * @description Paytabs rest api integration for nodejs
 * @author Walaa Elsaeed <walaa9131@gmail.com>
 */
//Used for http requests
import axios from "axios";

interface Config {
    merchantId: string;
    serverKey: string;
    region: string;
}

const config: Config = { merchantId: '', serverKey: '', region: '' }

export const setConfig = (merchantId: string, serverKey: string, region: string) => {
    config.merchantId = merchantId;
    config.serverKey = serverKey;
    config.region = region;
}

interface PaymentCode {
    payment_methods: string[];
}

interface Transaction {
    tran_type: string;
    tran_class: string;
    tran_ref?: string;
}

interface Cart {
    cart_id: string;
    cart_currency: string;
    cart_amount: number;
    cart_description: string;
}

interface Customer {
    name: string;
    email: string;
    phone: string;
    street1: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    ip: string;
}

interface Shipping {
    name: string;
    email: string;
    phone: string;
    street1: string;
    city: string;
    state: string;
    country: string;
    zip: string;
    ip: string;
}

interface Urls {
    callback: string;
    return_url: string;
}

interface createPaymentPageParams {

    payment_code: PaymentCode;
    transaction: Transaction;
    cart: Cart;
    customer: Customer;
    shipping: Shipping;
    urls: Urls;
    lang: string;
    callbackFunction: Function;
    framed: boolean;
}

/**
 * @description Create the payment page
 * Please pass all required information based on Paytabs documentation and your requirements
 */

export const createPaymentPage = ({ payment_code, transaction, cart, customer, shipping, urls, lang, callbackFunction, framed = false }: createPaymentPageParams) => {
    const data = {
        'profile_id': config.merchantId,
        'payment_methods': payment_code.payment_methods,
        "tran_type": transaction.tran_type,
        "tran_class": transaction.tran_class,
        "cart_id": cart.cart_id,
        "cart_currency": cart.cart_currency,
        "cart_amount": cart.cart_amount,
        "cart_description": cart.cart_description,
        "paypage_lang": lang,
        "customer_details": customer,
        "shipping_details": shipping,
        "callback": urls.callback,
        "return": urls.return_url,
        "framed": framed,
        "user_defined": {
            "package": "node.js PT2 V2.0.0",
        }
    }
    const url = _setEndPoint({ region: config.region }) + 'payment/request';
    _sendPost({ url, objData: data, callback: callbackFunction });
}

interface ValidatePaymentParams {
    tran_ref: string;
    callback: Function;
}
export const validatePayment = ({ tran_ref, callback }: ValidatePaymentParams) => {
    const data = {
        'profile_id': config.merchantId,
        'tran_ref': tran_ref
    }
    const url = _setEndPoint({ region: config.region }) + 'payment/query';
    _sendPost({ url, objData: data, callback });
}

interface QueryTransactionParams {
    transaction: Transaction;
    cart: Cart;
    callback: Function;
}

export const queryTransaction = ({ transaction, cart, callback }: QueryTransactionParams) => {
    const data = {
        'profile_id': config.merchantId,
        'tran_ref': transaction['tran_ref'],
        "tran_type": transaction['tran_type'],
        "tran_class": transaction['tran_class'],
        "cart_id": cart['cart_id'],
        "cart_currency": cart['cart_currency'],
        "cart_amount": cart['cart_amount'],
        "cart_description": cart['cart_description'],
    }
    const url = _setEndPoint({ region: config.region }) + 'payment/request';
    _sendPost({ url, objData: data, callback });
}


interface SendPostParams {
    url: string;
    objData: object;
    callback: Function;
}

function _sendPost({ url, objData, callback }: SendPostParams) {

    var sendData = {
        method: 'post',
        url: url,
        headers: {
            'authorization': config.serverKey
        },
        data: objData
    };
    axios(sendData)
        .then((res) => {
            callback(res.data);
        }).catch((error) => {
            let result;
            //This error will happen catch exceptions
            if (error.response) {
                result = error.response.data.message;
            }
            else {
                result = error.errno;
            }

            callback({ 'response_code:': 400, 'result': result });
        });


}

interface SetEndPointParams {
    region: string;
}
function _setEndPoint({ region }: SetEndPointParams) {
    const regions_urls = {
        ARE: 'https://secure.paytabs.com/', SAU: 'https://secure.paytabs.sa/',
        OMN: 'https://secure-oman.paytabs.com/', JOR: 'https://secure-jordan.paytabs.com/',
        EGY: 'https://secure-egypt.paytabs.com/', KWT: 'https://secure-kuwait.paytabs.com/', GLOBAL: 'https://secure-global.paytabs.com/'
    };

    for (const [key, value] of Object.entries(regions_urls)) {
        if (key === region) {
            return value;
        }
    }
}