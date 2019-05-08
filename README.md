# ![LOGO](logo.png) Zuora API Reference **flow**ground Connector

## Description

A generated **flow**ground connector for the Zuora API Reference API (version 2019-03-13).

Generated from: https://api.apis.guru/v2/specs/zuora.com/2019-03-13/swagger.json<br/>
Generated at: 2019-05-07T17:45:13+03:00

## API Description



# Introduction
Welcome to the reference for the Zuora REST API!

<a href="http://en.wikipedia.org/wiki/REST_API" target="_blank">REST</a> is a web-service protocol that lends itself to rapid development by using everyday HTTP and JSON technology.

The Zuora REST API provides a broad set of operations and resources that:

  * Enable Web Storefront integration from your website.
  * Support self-service subscriber sign-ups and account management.
  * Process revenue schedules through custom revenue rule models.
  * Enable manipulation of most objects in the Zuora Object Model.

Want to share your opinion on how our API works for you? <a href="https://community.zuora.com/t5/Developers/API-Feedback-Form/gpm-p/21399" target="_blank">Tell us how you feel </a>about using our API and what we can do to make it better.

## Access to the API

If you have a Zuora tenant, you can access the Zuora REST API via one of the following endpoints:

| Tenant              | Base URL for REST Endpoints |
|-------------------------|-------------------------|
|US Production | https://rest.zuora.com   |
|US API Sandbox    | https://rest.apisandbox.zuora.com|
|US Performance Test | https://rest.pt1.zuora.com |
|EU Production | https://rest.eu.zuora.com |
|EU Sandbox | https://rest.sandbox.eu.zuora.com |

The Production endpoint provides access to your live user data. API Sandbox tenants are a good place to test code without affecting real-world data. If you would like Zuora to provision an API Sandbox tenant for you, contact your Zuora representative for assistance.

**Note:** If you have a tenant in the Production Copy Environment, submit a request at <a href="http://support.zuora.com/" target="_blank">Zuora Global Support</a> to enable the Zuora REST API in your tenant and obtain the base URL for REST endpoints.

If you do not have a Zuora tenant, go to <a href="https://www.zuora.com/resource/zuora-test-drive" target="_blank">https://www.zuora.com/resource/zuora-test-drive</a> and sign up for a Production Test Drive tenant. The tenant comes with seed data, including a sample product catalog.

# API Changelog
You can find the <a href="https://community.zuora.com/t5/Developers/API-Changelog/gpm-p/18092" target="_blank">Changelog</a> of the API Reference in the Zuora Community.

# Authentication

## OAuth v2.0

Zuora recommends that you use OAuth v2.0 to authenticate to the Zuora REST API. Currently, OAuth is not available in every environment. See [Zuora Testing Environments](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/D_Zuora_Environments) for more information.

Zuora recommends you to create a dedicated API user with API write access on a tenant when authenticating via OAuth, and then create an OAuth client for this user. See <a href="https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users/Create_an_API_User" target="_blank">Create an API User</a> for how to do this. By creating a dedicated API user, you can control permissions of the API user without affecting other non-API users.

If a user is deactivated, all of the user's OAuth clients will be automatically deactivated.

Authenticating via OAuth requires the following steps:
1. Create a Client
2. Generate a Token
3. Make Authenticated Requests

### Create a Client

You must first [create an OAuth client](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users#Create_an_OAuth_Client_for_a_User) in the Zuora UI. To do this, you must be an administrator of your Zuora tenant. This is a one-time operation. You will be provided with a Client ID and a Client Secret. Please note this information down, as it will be required for the next step.

**Note:** The OAuth client will be owned by a Zuora user account. If you want to perform PUT, POST, or DELETE operations using the OAuth client, the owner of the OAuth client must have a Platform role that includes the "API Write Access" permission.

### Generate a Token

After creating a client, you must make a call to obtain a bearer token using the [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) operation. This operation requires the following parameters:
- `client_id` - the Client ID displayed when you created the OAuth client in the previous step
- `client_secret` - the Client Secret displayed when you created the OAuth client in the previous step
- `grant_type` - must be set to `client_credentials`

**Note**: The Client ID and Client Secret mentioned above were displayed when you created the OAuth Client in the prior step. The [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) response specifies how long the bearer token is valid for. Call [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) again to generate a new bearer token.

### Make Authenticated Requests

To authenticate subsequent API requests, you must provide a valid bearer token in an HTTP header:

`Authorization: Bearer {bearer_token}`

If you have [Zuora Multi-entity](https://www.zuora.com/developer/api-reference/#tag/Entities) enabled, you need to set an additional header to specify the ID of the entity that you want to access. You can use the `scope` field in the [Generate an OAuth token](https://www.zuora.com/developer/api-reference/#operation/createToken) response to determine whether you need to specify an entity ID.

If the `scope` field contains more than one entity ID, you must specify the ID of the entity that you want to access. For example, if the `scope` field contains `entity.1a2b7a37-3e7d-4cb3-b0e2-883de9e766cc` and `entity.c92ed977-510c-4c48-9b51-8d5e848671e9`, specify one of the following headers:
- `Zuora-Entity-Ids: 1a2b7a37-3e7d-4cb3-b0e2-883de9e766cc`
- `Zuora-Entity-Ids: c92ed977-510c-4c48-9b51-8d5e848671e9`

**Note**: For a limited period of time, Zuora will accept the `entityId` header as an alternative to the `Zuora-Entity-Ids` header. If you choose to set the `entityId` header, you must remove all "-" characters from the entity ID in the `scope` field.

If the `scope` field contains a single entity ID, you do not need to specify an entity ID.

## Other Supported Authentication Schemes

Zuora continues to support the following additional legacy means of authentication:

  * Use username and password. Include authentication with each request in the header: 
  
    * `apiAccessKeyId` 
    * `apiSecretAccessKey`
    
    Zuora recommends that you create an API user specifically for making API calls. See <a href="https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/Manage_Users/Create_an_API_User" target="_blank">Create an API User</a> for more information.
  
  * Use an authorization cookie. The cookie authorizes the user to make calls to the REST API for the duration specified in  **Administration > Security Policies > Session timeout**. The cookie expiration time is reset with this duration after every call to the REST API. To obtain a cookie, call the [Connections](https://www.zuora.com/developer/api-reference/#tag/Connections) resource with the following API user information: 
  
    *   ID    
    *   Password
    
  * For CORS-enabled APIs only: Include a 'single-use' token in the request header, which re-authenticates the user with each request. See below for more details.

### Entity Id and Entity Name

The `entityId` and `entityName` parameters are only used for [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity "Zuora Multi-entity"). These are the legacy parameters that Zuora will only continue to support for a period of time. Zuora recommends you to use the `Zuora-Entity-Ids` parameter instead.


The  `entityId` and `entityName` parameters specify the Id and the [name of the entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/B_Introduction_to_Entity_and_Entity_Hierarchy#Name_and_Display_Name "Introduction to Entity and Entity Hierarchy") that you want to access, respectively. Note that you must have permission to access the entity. 

You can specify either the `entityId` or `entityName` parameter in the authentication to access and view an entity.

  * If both `entityId` and `entityName` are specified in the authentication, an error occurs. 
  * If neither `entityId` nor `entityName` is specified in the authentication, you will log in to the entity in which your user account is created. 
  

To get the entity Id and entity name, you can use the GET Entities REST call. For more information, see [API User Authentication](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/A_Overview_of_Multi-entity#API_User_Authentication "API User Authentication").
  
  ### Token Authentication for CORS-Enabled APIs
  
  The CORS mechanism enables REST API calls to Zuora to be made directly from your customer's browser, with all credit card and security information transmitted directly to Zuora. This minimizes your PCI compliance burden, allows you to implement advanced validation on your payment forms, and  makes your payment forms look just like any other part of your website.
  
For security reasons, instead of using cookies, an API request via CORS uses **tokens** for authentication.

The token method of authentication is only designed for use with requests that must originate from your customer's browser; **it should  not be considered a replacement to the existing cookie authentication** mechanism.

See [Zuora CORS REST](https://knowledgecenter.zuora.com/DC_Developers/C_REST_API/Zuora_CORS_REST "Zuora CORS REST") for details on how CORS works and how you can begin to implement customer calls to the Zuora REST APIs. See  [HMAC Signatures](https://www.zuora.com/developer/api-reference/#operation/POSTHMACSignature "HMAC Signatures") for details on the HMAC method that returns the authentication token.

# Requests and Responses

## Request IDs 
As a general rule, when asked to supply a "key" for an account or subscription (accountKey, account-key, subscriptionKey, subscription-key), you can provide either the actual ID or  the number of the entity.

## HTTP Request Body

Most of the parameters and data accompanying your requests will be contained in the body of the HTTP request. 

The Zuora REST API accepts JSON in the HTTP request body. No other data format (e.g., XML) is supported.

### Data Type

([Actions](https://www.zuora.com/developer/api-reference/#tag/Actions) and CRUD operations only) We recommend that you do not specify the decimal values with quotation marks, commas, and spaces. Use characters of `+-0-9.eE`, for example, `5`, `1.9`, `-8.469`, and `7.7e2`. Also, Zuora does not convert currencies for decimal values.

## Testing a Request

Use a third party client, such as [curl](https://curl.haxx.se "curl"), [Postman](https://www.getpostman.com "Postman"), or [Advanced REST Client](https://advancedrestclient.com "Advanced REST Client"), to test the Zuora REST API.

You can test the Zuora REST API from the Zuora API Sandbox or Production tenants. If connecting to Production, bear in mind that you are working with your live production data, not sample data or test data.

## Testing with Credit Cards

Sooner or later it will probably be necessary to test some transactions that involve credit cards. For suggestions on how to handle this, see [Going Live With Your Payment Gateway](https://knowledgecenter.zuora.com/CB_Billing/M_Payment_Gateways/C_Managing_Payment_Gateways/B_Going_Live_Payment_Gateways#Testing_with_Credit_Cards "C_Zuora_User_Guides/A_Billing_and_Payments/M_Payment_Gateways/C_Managing_Payment_Gateways/B_Going_Live_Payment_Gateways#Testing_with_Credit_Cards"
).

## Concurrent Request Limits

Zuora enforces tenant-level concurrent request limits. See <a href="https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Policies/Concurrent_Request_Limits" target="_blank">Concurrent Request Limits</a> for more information.

## Timeout Limit

If a request does not complete within 120 seconds, the request times out and Zuora returns a Gateway Timeout error.

## Error Handling

Responses and error codes are detailed in [Responses and errors](https://knowledgecenter.zuora.com/DC_Developers/C_REST_API/Responses_and_Errors "Responses and errors").

# Pagination

When retrieving information (using GET methods), the optional `pageSize` query parameter sets the maximum number of rows to return in a response. The maximum is `40`; larger values are treated as `40`. If this value is empty or invalid, `pageSize` typically defaults to `10`.

The default value for the maximum number of rows retrieved can be overridden at the method level.

If more rows are available, the response will include a `nextPage` element, which contains a URL for requesting the next page.  If this value is not provided, no more rows are available. No "previous page" element is explicitly provided; to support backward paging, use the previous call.

## Array Size

For data items that are not paginated, the REST API supports arrays of up to 300 rows.  Thus, for instance, repeated pagination can retrieve thousands of customer accounts, but within any account an array of no more than 300 rate plans is returned.

# API Versions

The Zuora REST API are version controlled. Versioning ensures that Zuora REST API changes are backward compatible. Zuora uses a major and minor version nomenclature to manage changes. By specifying a version in a REST request, you can get expected responses regardless of future changes to the API.

## Major Version

The major version number of the REST API appears in the REST URL. Currently, Zuora only supports the **v1** major version. For example, `POST https://rest.zuora.com/v1/subscriptions`.

## Minor Version

Zuora uses minor versions for the REST API to control small changes. For example, a field in a REST method is deprecated and a new field is used to replace it. 

Some fields in the REST methods are supported as of minor versions. If a field is not noted with a minor version, this field is available for all minor versions. If a field is noted with a minor version, this field is in version control. You must specify the supported minor version in the request header to process without an error. 

If a field is in version control, it is either with a minimum minor version or a maximum minor version, or both of them. You can only use this field with the minor version between the minimum and the maximum minor versions. For example, the `invoiceCollect` field in the POST Subscription method is in version control and its maximum minor version is 189.0. You can only use this field with the minor version 189.0 or earlier.

If you specify a version number in the request header that is not supported, Zuora will use the minimum minor version of the REST API. In our REST API documentation, if a field or feature requires a minor version number, we note that in the field description.

You only need to specify the version number when you use the fields require a minor version. To specify the minor version, set the `zuora-version` parameter to the minor version number in the request header for the request call. For example, the `collect` field is in 196.0 minor version. If you want to use this field for the POST Subscription method, set the  `zuora-version` parameter to `196.0` in the request header. The `zuora-version` parameter is case sensitive.

For all the REST API fields, by default, if the minor version is not specified in the request header, Zuora will use the minimum minor version of the REST API to avoid breaking your integration. 

### Minor Version History

The supported minor versions are not serial. This section documents the changes made to each Zuora REST API minor version.

The following table lists the supported versions and the fields that have a Zuora REST API minor version.

| Fields         | Minor Version      | REST Methods    | Description |
|:--------|:--------|:--------|:--------|
| invoiceCollect | 189.0 and earlier  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription "Create Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription "Renew Subscription"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription "Cancel Subscription"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription "Suspend Subscription"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription "Resume Subscription"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account "Create Account")|Generates an invoice and collects a payment for a subscription. |
| collect        | 196.0 and later    | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription "Create Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription "Renew Subscription"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription "Cancel Subscription"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription "Suspend Subscription"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription "Resume Subscription"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account "Create Account")|Collects an automatic payment for a subscription. |
| invoice | 196.0 and 207.0| [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription "Create Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription "Renew Subscription"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription "Cancel Subscription"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription "Suspend Subscription"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription "Resume Subscription"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account "Create Account")|Generates an invoice for a subscription. |
| invoiceTargetDate | 196.0 and earlier  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription") |Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. |
| invoiceTargetDate | 207.0 and earlier  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription "Create Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription "Renew Subscription"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription "Cancel Subscription"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription "Suspend Subscription"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription "Resume Subscription"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account "Create Account")|Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. |
| targetDate | 207.0 and later | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription") |Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. |
| targetDate | 211.0 and later | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription "Create Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription "Renew Subscription"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription "Cancel Subscription"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription "Suspend Subscription"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription "Resume Subscription"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account "Create Account")|Date through which charges are calculated on the invoice, as `yyyy-mm-dd`. |
| includeExisting DraftInvoiceItems | 196.0 and earlier| [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription") | Specifies whether to include draft invoice items in subscription previews. Specify it to be `true` (default) to include draft invoice items in the preview result. Specify it to be `false` to excludes draft invoice items in the preview result. |
| includeExisting DraftDocItems | 207.0 and later  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription") | Specifies whether to include draft invoice items in subscription previews. Specify it to be `true` (default) to include draft invoice items in the preview result. Specify it to be `false` to excludes draft invoice items in the preview result. |
| previewType | 196.0 and earlier| [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription") | The type of preview you will receive. The possible values are `InvoiceItem`(default), `ChargeMetrics`, and `InvoiceItemChargeMetrics`. |
| previewType | 207.0 and later  | [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription") | The type of preview you will receive. The possible values are `LegalDoc`(default), `ChargeMetrics`, and `LegalDocChargeMetrics`. |
| runBilling  | 211.0 and later  | [Create Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_Subscription "Create Subscription"); [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription"); [Renew Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_RenewSubscription "Renew Subscription"); [Cancel Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_CancelSubscription "Cancel Subscription"); [Suspend Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_SuspendSubscription "Suspend Subscription"); [Resume Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_ResumeSubscription "Resume Subscription"); [Create Account](https://www.zuora.com/developer/api-reference/#operation/POST_Account "Create Account")|Generates an invoice or credit memo for a subscription. **Note:** Credit memos are only available if you have the Invoice Settlement feature enabled. |
| invoiceDate | 214.0 and earlier  | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment "Invoice and Collect") |Date that should appear on the invoice being generated, as `yyyy-mm-dd`. |
| invoiceTargetDate | 214.0 and earlier  | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment "Invoice and Collect") |Date through which to calculate charges on this account if an invoice is generated, as `yyyy-mm-dd`. |
| documentDate | 215.0 and later | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment "Invoice and Collect") |Date that should appear on the invoice and credit memo being generated, as `yyyy-mm-dd`. |
| targetDate | 215.0 and later | [Invoice and Collect](https://www.zuora.com/developer/api-reference/#operation/POST_TransactionInvoicePayment "Invoice and Collect") |Date through which to calculate charges on this account if an invoice or a credit memo is generated, as `yyyy-mm-dd`. |
| memoItemAmount | 223.0 and earlier | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc "Create credit memo from charge"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc "Create debit memo from charge") | Amount of the memo item. |
| amount | 224.0 and later | [Create credit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_CreditMemoFromPrpc "Create credit memo from charge"); [Create debit memo from charge](https://www.zuora.com/developer/api-reference/#operation/POST_DebitMemoFromPrpc "Create debit memo from charge") | Amount of the memo item. |
| subscriptionNumbers | 222.4 and earlier | [Create order](https://www.zuora.com/developer/api-reference/#operation/POST_Order "Create order") | Container for the subscription numbers of the subscriptions in an order. |
| subscriptions | 223.0 and later | [Create order](https://www.zuora.com/developer/api-reference/#operation/POST_Order "Create order") | Container for the subscription numbers and statuses in an order. |
| creditTaxItems | 238.0 and earlier | [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems "Get credit memo items"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem "Get credit memo item") | Container for the taxation items of the credit memo item. |
| taxItems | 238.0 and earlier | [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems "Get debit memo items"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem "Get debit memo item") | Container for the taxation items of the debit memo item. |
| taxationItems | 239.0 and later | [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems "Get credit memo items"); [Get credit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItem "Get credit memo item"); [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems "Get debit memo items"); [Get debit memo item](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItem "Get debit memo item") | Container for the taxation items of the memo item. |


#### Version 207.0 and Later

The response structure of the [Preview Subscription](https://www.zuora.com/developer/api-reference/#operation/POST_SubscriptionPreview "Preview Subscription") and [Update Subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription "Update Subscription") methods are changed. The following invoice related response fields are moved to the invoice container:

  * amount
  * amountWithoutTax
  * taxAmount
  * invoiceItems
  * targetDate
  * chargeMetrics

# Zuora Object Model

The following diagram presents a high-level view of the key Zuora objects. Click the image to open it in a new tab to resize it.

<a href="https://www.zuora.com/wp-content/uploads/2017/01/ZuoraERD.jpeg" target="_blank"><img src="https://www.zuora.com/wp-content/uploads/2017/01/ZuoraERD.jpeg" alt="Zuora Object Model Diagram"></a>

See the following articles for information about other parts of the Zuora business object model:

  * <a href="https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/D_Invoice_Settlement_Object_Model" target="_blank">Invoice Settlement Object Model</a>
  * <a href="https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/BA_Orders_Object_Model" target="_blank">Orders Object Model</a>

You can use the [Describe object](https://www.zuora.com/developer/api-reference/#operation/GET_Describe) operation to list the fields of each Zuora object that is available in your tenant. When you call the operation, you must specify the API name of the Zuora object.

The following table provides the API name of each Zuora object:

| Object                                        | API Name                                   |
|-----------------------------------------------|--------------------------------------------|
| Account                                       | `Account`                                  |
| Accounting Code                               | `AccountingCode`                           |
| Accounting Period                             | `AccountingPeriod`                         |
| Amendment                                     | `Amendment`                                |
| Application Group                             | `ApplicationGroup`                         |
| Billing Run                                   | <p>`BillingRun`</p><p>**Note:** The API name of this object is `BillingRun` in the [Describe object](https://www.zuora.com/developer/api-reference/#operation/GET_Describe) operation and Export ZOQL queries only. Otherwise, the API name of this object is `BillRun`.</p> |
| Contact                                       | `Contact`                                  |
| Contact Snapshot                              | `ContactSnapshot`                          |
| Credit Balance Adjustment                     | `CreditBalanceAdjustment`                  |
| Credit Memo                                   | `CreditMemo`                               |
| Credit Memo Application                       | `CreditMemoApplication`                    |
| Credit Memo Application Item                  | `CreditMemoApplicationItem`                |
| Credit Memo Item                              | `CreditMemoItem`                           |
| Credit Memo Part                              | `CreditMemoPart`                           |
| Credit Memo Part Item                         | `CreditMemoPartItem`                       |
| Credit Taxation Item                          | `CreditTaxationItem`                       |
| Custom Exchange Rate                          | `FXCustomRate`                             |
| Debit Memo                                    | `DebitMemo`                                |
| Debit Memo Item                               | `DebitMemoItem`                            |
| Debit Taxation Item                           | `DebitTaxationItem`                        |
| Discount Applied Metrics                      | `DiscountAppliedMetrics`                   |
| Entity                                        | `Tenant`                                   |
| Feature                                       | `Feature`                                  |
| Gateway Reconciliation Event                  | `PaymentGatewayReconciliationEventLog`     |
| Gateway Reconciliation Job                    | `PaymentReconciliationJob`                 |
| Gateway Reconciliation Log                    | `PaymentReconciliationLog`                 |
| Invoice                                       | `Invoice`                                  |
| Invoice Adjustment                            | `InvoiceAdjustment`                        |
| Invoice Item                                  | `InvoiceItem`                              |
| Invoice Item Adjustment                       | `InvoiceItemAdjustment`                    |
| Invoice Payment                               | `InvoicePayment`                           |
| Journal Entry                                 | `JournalEntry`                             |
| Journal Entry Item                            | `JournalEntryItem`                         |
| Journal Run                                   | `JournalRun`                               |
| Order                                         | `Order`                                    |
| Order Action                                  | `OrderAction`                              |
| Order ELP                                     | `OrderElp`                                 |
| Order Item                                    | `OrderItem`                                |
| Order MRR                                     | `OrderMrr`                                 |
| Order Quantity                                | `OrderQuantity`                            |
| Order TCB                                     | `OrderTcb`                                 |
| Order TCV                                     | `OrderTcv`                                 |
| Payment                                       | `Payment`                                  |
| Payment Application                           | `PaymentApplication`                       |
| Payment Application Item                      | `PaymentApplicationItem`                   |
| Payment Method                                | `PaymentMethod`                            |
| Payment Method Snapshot                       | `PaymentMethodSnapshot`                    |
| Payment Method Transaction Log                | `PaymentMethodTransactionLog`              |
| Payment Method Update                         | `UpdaterDetail`                            |
| Payment Part                                  | `PaymentPart`                              |
| Payment Part Item                             | `PaymentPartItem`                          |
| Payment Run                                   | `PaymentRun`                               |
| Payment Transaction Log                       | `PaymentTransactionLog`                    |
| Processed Usage                               | `ProcessedUsage`                           |
| Product                                       | `Product`                                  |
| Product Feature                               | `ProductFeature`                           |
| Product Rate Plan                             | `ProductRatePlan`                          |
| Product Rate Plan Charge                      | `ProductRatePlanCharge`                    |
| Product Rate Plan Charge Tier                 | `ProductRatePlanChargeTier`                |
| Rate Plan                                     | `RatePlan`                                 |
| Rate Plan Charge                              | `RatePlanCharge`                           |
| Rate Plan Charge Tier                         | `RatePlanChargeTier`                       |
| Refund                                        | `Refund`                                   |
| Refund Application                            | `RefundApplication`                        |
| Refund Application Item                       | `RefundApplicationItem`                    |
| Refund Invoice Payment                        | `RefundInvoicePayment`                     |
| Refund Part                                   | `RefundPart`                               |
| Refund Part Item                              | `RefundPartItem`                           |
| Refund Transaction Log                        | `RefundTransactionLog`                     |
| Revenue Charge Summary                        | `RevenueChargeSummary`                     |
| Revenue Charge Summary Item                   | `RevenueChargeSummaryItem`                 |
| Revenue Event                                 | `RevenueEvent`                             |
| Revenue Event Credit Memo Item                | `RevenueEventCreditMemoItem`               |
| Revenue Event Debit Memo Item                 | `RevenueEventDebitMemoItem`                |
| Revenue Event Invoice Item                    | `RevenueEventInvoiceItem`                  |
| Revenue Event Invoice Item Adjustment         | `RevenueEventInvoiceItemAdjustment`        |
| Revenue Event Item                            | `RevenueEventItem`                         |
| Revenue Event Item Credit Memo Item           | `RevenueEventItemCreditMemoItem`           |
| Revenue Event Item Debit Memo Item            | `RevenueEventItemDebitMemoItem`            |
| Revenue Event Item Invoice Item               | `RevenueEventItemInvoiceItem`              |
| Revenue Event Item Invoice Item Adjustment    | `RevenueEventItemInvoiceItemAdjustment`    |
| Revenue Event Type                            | `RevenueEventType`                         |
| Revenue Schedule                              | `RevenueSchedule`                          |
| Revenue Schedule Credit Memo Item             | `RevenueScheduleCreditMemoItem`            |
| Revenue Schedule Debit Memo Item              | `RevenueScheduleDebitMemoItem`             |
| Revenue Schedule Invoice Item                 | `RevenueScheduleInvoiceItem`               |
| Revenue Schedule Invoice Item Adjustment      | `RevenueScheduleInvoiceItemAdjustment`     |
| Revenue Schedule Item                         | `RevenueScheduleItem`                      |
| Revenue Schedule Item Credit Memo Item        | `RevenueScheduleItemCreditMemoItem`        |
| Revenue Schedule Item Debit Memo Item         | `RevenueScheduleItemDebitMemoItem`         |
| Revenue Schedule Item Invoice Item            | `RevenueScheduleItemInvoiceItem`           |
| Revenue Schedule Item Invoice Item Adjustment | `RevenueScheduleItemInvoiceItemAdjustment` |
| Subscription                                  | `Subscription`                             |
| Subscription Product Feature                  | `SubscriptionProductFeature`               |
| Taxable Item Snapshot                         | `TaxableItemSnapshot`                      |
| Taxation Item                                 | `TaxationItem`                             |
| Updater Batch                                 | `UpdaterBatch`                             |
| Usage                                         | `Usage`                                    |


## Authorization

This API does not require authorization.

## Actions

### Get job status and response

> **Note:** This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. This operation is in **Limited Availability**.<br/>
> <br/>
> <br/>
> Get the status and response of an asynchronous job. Currently, an asynchronous job created by "Create order asynchronously" or "Preview order asynchronously" is supported.

*Tags:* `Orders`

#### Input Parameters
* `jobId` - _required_ - UUID of the asynchronous job created by an asynchronous API operation.

### Create order asynchronously

> **Note:** This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. This operation is in **Limited Availability**.<br/>
> <br/>
> <br/>
> In the case where a normal "Create order" operation call will time out, use this operation instead to create an order asynchronously. A job will be creating the order in the back end; the job ID will be returned for tracking the job status and result.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. 

You need to set this parameter if you use the following fields:
* subscriptions
* subscriptionNumbers


### Preview order asynchronously

> **Note:** This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. This operation is in **Limited Availability**. <br/>
> <br/>
> <br/>
> In the case where a normal "Preview order" operation call will time out, use this operation instead to preview an order asynchronously. A job will be previewing the order in the back end; the job ID will be returned for tracking the job status and result.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Query event triggers

*Tags:* `Event Triggers`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `baseObject` - _optional_ - The Zuora object that trigger condition is defined upon. Should be specified in the pattern: ^[A-Z][\\w\\-]*$
* `eventTypeName` - _optional_ - The event type name. Should be specified in the pattern: ^[A-Za-z]{1,}[\w\-]*$
* `active` - _optional_ - The status of the event trigger.
* `start` - _optional_ - The first index of the query result. Default to 0 if absent, and the minimum is 0.
* `limit` - _optional_ - The maximum number of data records to be returned. Default to 10 if absent.

### Create an event trigger

> You can define an event trigger on any of the following objects:<br/>
> <br/>
>   * Account<br/>
>   * AccountingCode<br/>
>   * AccountingPeriod<br/>
>   * Amendment<br/>
>   * BillingRun<br/>
>   * Contact<br/>
>   * CreditBalanceAdjustment<br/>
>   * CreditMemo<br/>
>   * CreditMemoApplication<br/>
>   * CreditMemoApplicationItem<br/>
>   * CreditMemoItem<br/>
>   * DebitMemo<br/>
>   * DebitMemoItem<br/>
>   * Feature<br/>
>   * Invoice<br/>
>   * InvoiceAdjustment<br/>
>   * InvoiceItem<br/>
>   * InvoiceItemAdjustment<br/>
>   * JournalEntry<br/>
>   * JournalEntryItem<br/>
>   * Order<br/>
>   * OrderAction<br/>
>   * Payment<br/>
>   * PaymentApplication<br/>
>   * PaymentMethod<br/>
>   * PaymentPart<br/>
>   * Product<br/>
>   * ProductFeature<br/>
>   * ProductRatePlan<br/>
>   * ProductRatePlanCharge<br/>
>   * RatePlan<br/>
>   * RatePlanCharge<br/>
>   * Refund<br/>
>   * RefundApplication<br/>
>   * RevenueEvent<br/>
>   * RevenueEventItem<br/>
>   * RevenueSchedule<br/>
>   * RevenueScheduleItem<br/>
>   * Subscription<br/>
>   * SubscriptionProductFeature<br/>
>   * TaxationItem<br/>
>   * Usage<br/>
> <br/>
> The `baseObject` field specifies which object to define a trigger on. The `condition` field is a [JEXL](http://commons.apache.org/proper/commons-jexl/) expression that specifies when to trigger events. The expression can contain fields from the object that the trigger is defined on.<br/>
> <br/>
> **Note:** The condition cannot contain fields from [data source](https://knowledgecenter.zuora.com/DC_Developers/M_Export_ZOQL) objects that are joined to the object that the trigger is defined on.<br/>
> <br/>
> For example, the following condition causes an event to be triggered whenever an invoice is posted with an amount greater than 1000:<br/>
> <br/>
> ```changeType == 'UPDATE' && Invoice.Status == 'Posted' && Invoice.Status_old != 'Posted' && Invoice.Amount > 1000```<br/>
> <br/>
> Where:<br/>
> <br/>
>   * `changeType` is a keyword that specifies the type of change that occurred to the Invoice object. For all objects, the supported values of `changeType` are `INSERT`, `UPDATE`,  and `DELETE`.<br/>
>   * `Invoice.Status` is the value of the Invoice object's `Status` field after the change occurred.<br/>
>   * `Invoice.Status_old` is the value of the Invoice object's `Status` field before the change occurred.<br/>
> <br/>
> In the above example, the value of `baseObject` would be `Invoice`.<br/>
> <br/>
> **Note:** The number of the event triggers that you can create depends on the [edition of Zuora Central Platform](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/C_Zuora_Editions) you are using.

*Tags:* `Event Triggers`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Remove an event trigger

*Tags:* `Event Triggers`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_

### Get an event trigger by ID

*Tags:* `Event Triggers`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_

### Update an event trigger

*Tags:* `Event Triggers`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_

### Query email templates

> Queries email templates.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `start` - _optional_ - The first index of the query result.
* `limit` - _optional_ - The maximum number of results the query should return.
* `eventTypeName` - _optional_ - The name of the event.
* `name` - _optional_ - The name of the email template.

### Create an email template

> Creates an email template.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete an email template

> Deletes an email template.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the email template to be deleted.

### Get an email template

> Queries the email template of the specified ID.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the email template.

### Update an email template

> Updates an email template.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the email template to be updated.

### Query notification definitions

> Queries notification definitions with the specified filters.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `start` - _optional_ - The first index of the query result.
* `limit` - _optional_ - The maximum number of results the query should return.
* `profileId` - _optional_ - Id of the profile.
* `eventTypeName` - _optional_ - The name of the event.
* `emailTemplateId` - _optional_ - The ID of the email template.

### Create a notification definition

> Creates a notification definition. If a filter rule is specified, it will be evaluated to<br/>
> see if the notification definition is qualified to handle the incoming events <br/>
> during runtime. If the notification is qualified, it will send the email and<br/>
> invoke the callout if it has an email template or a callout.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete a notification definition

> Deletes a notification definition.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the notification definition to be deleted.

### Get a notification definition

> Queries the notification definition of the given ID.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the notification definition.

### Update a notification definition

> Updates a notification definition.

*Tags:* `Notifications`

#### Input Parameters
* `Authorization` - _required_ - `Bearer {token}` for a valid OAuth token.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the notification definition to be updated.

### Generate an OAuth token

> Generates a bearer token that enables an OAuth client to authenticate with the Zuora REST API. The OAuth client must have been created using the Zuora UI. See [Authentication](https://www.zuora.com/developer/api-reference/#section/Authentication) for more information.<br/>
> <br/>
> **Note:** When using this operation, do not set any authentication headers such as `Authorization`, `apiAccessKeyId`, or `apiSecretAccessKey`.<br/>
> <br/>
> You should not use this operation to generate a large number of bearer tokens in a short period of time; each token should be used until it expires. If you receive a 429 Too Many Requests response when using this operation, reduce the frequency of requests. This endpoint is rate limited by IP address.

*Tags:* `OAuth`

#### Input Parameters
* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Get all accounting codes

> This reference describes how to query all accounting codes in your chart of accounts through the REST API.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.


### Create accounting code

> This reference describes how to create a new accounting code through the REST API. <br/>
> The accounting code will be active as soon as it has been created.<br/>
> <br/>
> ## Prerequisites<br/>
>   If you have Zuora Finance enabled on your tenant, you must have the  Configure Accounting Codes permission.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete accounting code

> This reference describes how to delete an accounting code through the REST API.<br/>
> ## Prerequisites<br/>
> If you have Zuora Finance enabled on your tenant, then you must have the Delete Unused Accounting Code permission.<br/>
> ## Limitations<br/>
> You can only delete accounting codes that have never been associated with any transactions. An accounting code must be deactivated before you can delete it.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ac-id` - _required_ - ID of the accounting code you want to delete.

### Query an accounting code

> This reference describes how to query an accounting code through the REST API.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ac-id` - _required_ - ID of the accounting code you want to query.

### Update an accounting code

> This reference describes how to update an existing accounting code through the REST API.<br/>
> ## Prerequisites<br/>
>   If you have Zuora Finance enabled on your tenant, you must have the  Manage Accounting Code permission. <br/>
> ## Limitations<br/>
> You can only update accounting codes that are not already associated with any transactions.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ac-id` - _required_ - ID of the accounting code you want to update.

### Activate accounting code

> This reference describes how to activate an accounting code through the REST API.<br/>
> <br/>
> Prerequisites<br/>
> -------------<br/>
> If you have Zuora Finance enabled on your tenant, you must have the Manage Accounting Code permission.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ac-id` - _required_ - ID of the accounting code you want to activate.

### Deactivate accounting code

> This reference describes how to deactivate an accounting code through the REST API.<br/>
> <br/>
> ## Prerequisites<br/>
> If you have Zuora Finance enabled on your tenant, you must have the Manage Accounting Code permission.<br/>
> ## Limitations<br/>
> You can only deactivate accounting codes that are not associated with any transactions. <br/>
> You cannot disable accounting codes of type AccountsReceivable.

*Tags:* `Accounting Codes`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ac-id` - _required_ - ID of the accounting code you want to deactivate.

### Get all accounting periods

> Retrieves all accounting periods on your tenant.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.


### Create accounting period

> Creates an accounting period.<br/>
> Prerequisites<br/>
> -------------<br/>
> * You must have Zuora Finance enabled on your tenant.<br/>
> * You must have the Create Accounting Period user permission.<br/>
> <br/>
> Limitations<br/>
> -----------<br/>
> * When creating the first accounting period on your tenant, the start date must be equal to or earlier than the date of the earliest transaction on the tenant.<br/>
> * Start and end dates of accounting periods must be contiguous. For example, if one accounting period ends on January 31, the next period must start on February 1.<br/>
> * If you have the Revenue Recognition Package and have enabled the "Monthly recognition over time" revenue recognition model, the accounting period start date and end date must be on the first day and last day of the month, respectively. Note that the start and end dates do not necessarily have to be in the same month.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete accounting period

> Deletes an accounting period.<br/>
> <br/>
> Prerequisites<br/>
> -------------<br/>
> <br/>
>  * You must have Zuora Finance enabled on your tenant.<br/>
> <br/>
>  * You must have the Delete Accounting Period user permission. See [Finance Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/f_Finance_Roles).<br/>
> <br/>
> <br/>
> Limitations<br/>
> -----------<br/>
> <br/>
> The accounting period to be deleted:<br/>
> <br/>
> * Must be the most recent accounting period<br/>
> <br/>
> * Must be an open accounting period<br/>
> <br/>
> * Must have no revenue distributed into it<br/>
> <br/>
> * Must not have any active journal entries<br/>
> <br/>
> * Must not be the open-ended accounting period<br/>
> <br/>
> * Must not be in the process of running a trial balance

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period you want to delete.

### Get accounting period

> Retrieves an accounting period.<br/>
> Prerequisites<br/>
> -------------<br/>
> <br/>
> You must have Zuora Finance enabled on your tenant.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period you want to get.

### Update accounting period

> Updates an accounting period.<br/>
> <br/>
> Prerequisites<br/>
> -------------<br/>
> <br/>
> * You must have Zuora Finance enabled on your tenant.<br/>
> <br/>
> * You must have the Create Accounting Period user permission. See [Finance Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/f_Finance_Roles).<br/>
> <br/>
> Limitations<br/>
> -----------<br/>
> <br/>
> * You can update the start date of only the earliest accounting period on your tenant. You cannot update the start date of later periods.<br/>
> <br/>
> * If you update the earliest accounting period, the start date must be equal to or earlier than the date of the earliest transaction on the tenant.<br/>
> <br/>
> * Start and end dates of accounting periods must be contiguous. For example, if one accounting period ends on January 31, the next period must start on February 1.<br/>
> <br/>
> * If you have the Revenue Recognition Package and have enabled the "Monthly recognition over time" revenue recognition model, the accounting period start date and end date must be on the first day and last day of the month, respectively. Note that the start and end dates do not necessarily have to be in the same month.<br/>
> <br/>
> * You cannot update the start date or end date of an accounting period if:<br/>
>   * Any revenue has been distributed into the period.<br/>
>   * The period has any active journal entries.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period you want to update.

### Close accounting period

> Close an accounting period by accounting period ID.<br/>
> <br/>
> Prerequisites<br/>
> -------------<br/>
> You must have Zuora Finance enabled on your tenant. You must have the Manage Close Process and Run Trial Balance user permissions.<br/>
> <br/>
> Limitations<br/>
> -----------<br/>
> * The accounting period cannot already be closed.<br/>
> * The accounting period cannot be in the process of running a trial balance.<br/>
> * All earlier accounting periods must be closed.<br/>
> * There must be no required action items for the accounting period. See Reconcile Transactions Before Closing an Accounting Period for more information.<br/>
> <br/>
> Notes<br/>
> -----<br/>
> When you close an accounting period in Zuora, a trial balance is automatically run for that period. A successful response means only that the accounting period is now closed, but does not mean that the trial balance has successfully completed.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period you want to close.

### Set accounting period to pending close

> Sets an accounting period to pending close.<br/>
> <br/>
> <br/>
> Prerequisites<br/>
> -------------<br/>
> <br/>
> * You must have Zuora Finance enabled on your tenant.<br/>
> * You must have the Manage Close Process and Run Trial Balance user permissions.<br/>
> <br/>
>             <br/>
> Limitations <br/>
>  -----------<br/>
>  <br/>
>  * The accounting period cannot be closed or pending close.<br/>
>  <br/>
>  * The accounting period cannot be in the process of running a trial balance.<br/>
>  <br/>
>  * All earlier accounting periods must be closed.<br/>
>  <br/>
>  <br/>
> Notes<br/>
> -----<br/>
> When you set an accounting period to pending close in Zuora, a trial balance is automatically run for that period. A response of `{ "success": true }`  means only that the accounting period status is now pending close, but does not mean that the trial balance has successfully completed. You can use the Get Accounting Period REST API call to view details about the outcome of the trial balance.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period you want to set to pending close.

### Re-open accounting period

> Re-opens an accounting period.<br/>
> Prerequisites<br/>
> -------------<br/>
> * You must have Zuora Finance enabled on your tenant.<br/>
> * You must have the Manage Close Process and Run Trial Balance user permissions.<br/>
> <br/>
> Limitations<br/>
> -----------<br/>
> * The accounting period must be closed or pending close.<br/>
> * You can only re-open an accounting period that is immediately previous to an open period.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period that you want to re-open.

### Run trial balance

> Runs the trial balance for an accounting period. <br/>
> <br/>
> Prerequisites<br/>
> -------------<br/>
> <br/>
> * You must have Zuora Finance enabled on your tenant.<br/>
> <br/>
> * You must have the Manage Close Process and Run Trial Balance user permissions. See [Finance Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/f_Finance_Roles).<br/>
> <br/>
>           <br/>
> Limitations <br/>
> -----------<br/>
>  <br/>
>  * The accounting period must be open.<br/>
>  <br/>
>  * The accounting period cannot already be in the process of running a trial balance.<br/>
>  <br/>
> Notes<br/>
> -----<br/>
> The trial balance is run asynchronously. A response of `{ "success": true }` means only that the trial balance has started processing, but does not mean that the trial balance has successfully completed. You can use the [Get Accounting Period](https://www.zuora.com/developer/api-reference/#operation/GET_AccountingPeriod) REST API call to view details about the outcome of the trial balance.

*Tags:* `Accounting Periods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `ap-id` - _required_ - ID of the accounting period for which you want to run a trial balance.

### Create account

> Creates a customer account with a credit card payment method, a bill-to contact, and an optional sold-to contact. Request and response field descriptions and sample code are provided. Use this operation to optionally create a subscription, invoice for that subscription, and collect payment through the default payment method. The transaction is atomic; if any part fails for any reason, the entire transaction is rolled back.<br/>
> <br/>
> This operation is CORS Enabled, so you can use client-side Javascript to invoke the call. <br/>
> <br/>
> ## Notes<br/>
> 1. The account is created in active status.  <br/>
> 2. If the `autoPay` field is set to `true` in the request, you must provide either the `creditCard` field or the `hpmCreditCardPaymentMethodId` field, but not both. The one provided becomes the default payment method for this account. If the credit card information is declined or cannot be verified, no account is created.<br/>
> 3. Customer accounts created with this call are automatically be set to Auto Pay.<br/>
> 4. If either the `workEmail` or `personalEmail` field is specified, then the account's email delivery preference is automatically set to `true`. (In that case, emails go to the `workEmail` address, if it exists, or else the `personalEmail`.) If neither field is specified, the email delivery preference is automatically set to `false`.<br/>
> 5. You cannot use this operation to create subscriptions if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> <br/>
> ## Defaults for customerAcceptanceDate and serviceActivationDate<br/>
> Default values for **customerAcceptanceDate** and **serviceActivationDate** are set as follows.<br/>
> <br/>
> |        | serviceActivationDate(SA) specified          | serviceActivationDate (SA) NOT specified  |<br/>
> | ------------- |:-------------:| -----:|<br/>
> | customerAcceptanceDate (CA) specified      | SA uses value in the request call; CA uses value in the request call| CA uses value in the request call;SA uses CE as default |<br/>
> | customerAcceptanceDate (CA) NOT specified      | SA uses value in the request call; CA uses SA as default |   SA and CA use CE as default |

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the following fields:
* invoice
* collect
* runBilling
* targetDate


### Create job to hard delete billing document files

> Creates an asynchronous job to permanently delete all billing document PDF files for specific accounts. <br/>
> <br/>
> After the deletion job is completed, all billing document PDF files are permanently deleted. To retrieve the status of a deletion job, call [Get job of hard deleting billing document files](https://www.zuora.com/developer/api-reference/#operation/GET_BillingDocumentFilesDeletionJob).<br/>
> <br/>
> **Note**: This operation can be used only if you have the Billing user permission "Hard Delete Billing Document Files" enabled.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get job of hard deleting billing document files

> Retrieves information about an asynchronous job of permanently deleting all billing document PDF files for specific accounts.<br/>
> <br/>
> **Note**: This operation can be used only if you have the Billing user permission "Hard Delete Billing Document Files" enabled.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `jobId` - _required_ - The unique ID of a billing document file deletion job. For example, 2c92c8f83dc4f752013dc72c24ee016c.

### Get account

> Retrieves basic information about a customer account.<br/>
> <br/>
> This operation is a quick retrieval that doesn't include the account's subscriptions, invoices, payments, or usage details. Use Get account summary to get more detailed information about an account.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `account-key` - _required_ - Account number or account ID.

### Update account

> Updates a customer account by specifying the account-key.<br/>
> <br/>
> ## Notes<br/>
> 1. Only the fields to be changed should be specified.  Any field that is not included in the request body will not be changed.<br/>
> 2. If an empty field is submitted with this operation, the corresponding field in the account is emptied.<br/>
> 3. Email addresses: If no email addresses are specified, no change is made to the email addresses on file or to the email delivery preference. If either the **personalEmail** or **workEmail** is specified (or both), the system updates the corresponding email address(es) on file and the email delivery preference is set to `true`. (In that case, emails go to the **workEmail** address, if it exists, or else the **personalEmail**.) On the other hand, if as a result of this call both of the email addresses for the account are empty, the email delivery preference is set to `false`.<br/>
> 4. The bill-to and sold-to contacts are separate data entities; updating either one does not update the other.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `account-key` - _required_ - Account number or account ID.

### Get account summary

> Retrieves detailed information about the specified customer account.<br/>
> <br/>
> The response includes the account information and a summary of the account's subscriptions, invoices, payments, and usages for the last six recently updated subscriptions.<br/>
> <br/>
> ## Notes <br/>
> Returns only the six most recent subscriptions based on the subscription updatedDate. Within those subscriptions, there may be many rate plans and many rate plan charges. These items are subject to the maximum limit on the array size.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `account-key` - _required_ - Account number or account ID.

### Generate billing documents by account

> Generates draft or posted billing documents for a specified account. You can also generate billing documents for specified subscriptions of a specified account. The billing documents contain invoices and credit memos. To generate credit memos, you must have the Invoice Settlement feature enabled.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The ID of the customer account that billing documents are generated for. For example, 8a8082e65b27f6c3015ba3e326b26419.


### Amend

> Modifies a subscription by creating Amendment objects.<br/>
> <br/>
> The availability of this operation depends on whether you have the Orders feature enabled:<br/>
> <br/>
> * If you have the Orders feature enabled, this operation is not available. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> <br/>
> * If you do not have the Orders feature enabled, this operation is available. However, Zuora recommends that you use [Update subscription](https://www.zuora.com/developer/api-reference/#operation/PUT_Subscription) instead of this operation.<br/>
> <br/>
> You can use this operation to create up to 10 Amendment objects. You must specify the following fields for each Amendment object:<br/>
> <br/>
> * `ContractEffectiveDate`<br/>
> * `Name`<br/>
> * `SubscriptionId`<br/>
> * `Type`<br/>
> <br/>
> Additionally, the value of `SubscriptionId` must be the same for each Amendment object. You cannot use this operation to update multiple subscriptions.<br/>
> <br/>
> **Note:** When you call this operation, Zuora modifies the subscription in the order that you specify Amendment objects in the request body.<br/>
> <br/>
> If Zuora is unable to create an Amendment object when you call this operation, the entire call fails.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Create

> Use the create call to create one or more objects of a specific type. You can specify different types in different create calls, but each create call must apply to only one type of object.<br/>
> <br/>
> ## Limits<br/>
> <br/>
> ### Objects per Call<br/>
> <br/>
> 50 objects are supported in a single call.<br/>
> <br/>
> <br/>
> <br/>
> ## How to Use this Call<br/>
> <br/>
> You can call create on an array of one or more zObjects. It returns an array of SaveResults, indicating the success or failure of creating each object. The following information applies to this call:<br/>
> <br/>
> * You cannot pass in null zObjects.<br/>
> * You can pass in a maximum of 50 zObjects at a time.<br/>
> * All objects must be of the same type.<br/>
> <br/>
> ### Using Create and Subscribe Calls <br/>
> Both the create and subscribe calls will create a new account. However, there are differences between the calls.<br/>
> <br/>
> Use the create call to create an account independent of a subscription.<br/>
> <br/>
> Use the subscribe call to create the account with the subscription and the initial payment information.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Delete

> Deletes one or more objects of the same type. You can specify different types in different delete calls, but each delete call must apply only to one type of object.<br/>
> <br/>
> The following information applies to this call:<br/>
> <br/>
> * You will need to first determine the IDs for the objects you wish to delete.<br/>
> * You cannot pass in any null IDs.<br/>
> * All objects in a specific delete call must be of the same type.<br/>
> <br/>
> <br/>
> ### Objects per Call<br/>
> 50 objects are supported in a single call.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Execute

> Use the execute call to execute a process to split an invoice into multiple invoices. The original invoice must be in draft status. The resulting invoices are called split invoices.<br/>
> <br/>
> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com). <br/>
> <br/>
> To split a draft invoice into multiple split invoices:<br/>
> <br/>
> 1. Use the create call to create a separate InvoiceSplitItem object for each split invoice that you want to create from the original draft invoice.<br/>
> 2. Use the create call to create a single InvoiceSplit object to collect all of the InvoiceSplitItem objects.<br/>
> 3. Use the execute call to split the draft invoice into multiple split invoices.<br/>
> <br/>
> You need to create InvoiceSplitItem objects and an InvoiceSplit object before you can use the execute call. <br/>
> <br/>
> * Supported objects: InvoiceSplit<br/>
> * Asynchronous process: yes

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Generate

> Generates an on-demand invoice for a specific customer. This is similar to creating an ad-hoc bill run for a specific customer account in the Zuora UI.<br/>
> <br/>
> * Supported objects: Invoice<br/>
> * Asynchronous process: yes<br/>
> <br/>
> The ID of the generated invoice is returned in the response. If multiple invoices are generated, only the id of the first invoice generated is returned. This occurs when an account has multiple subscriptions with the [invoice subscription separately](https://knowledgecenter.zuora.com/BC_Subscription_Management/Subscriptions/B_Creating_Subscriptions/Invoicing_Subscriptions_Separately) option enabled.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Query

> The query call sends a query expression by specifying the object to query, the fields to retrieve from that object, and any filters to determine whether a given object should be queried.<br/>
> <br/>
> <br/>
> You can use [Zuora Object Query Language](https://knowledgecenter.zuora.com/DC_Developers/K_Zuora_Object_Query_Language) (ZOQL) to construct those queries, passing them through the `queryString`.<br/>
> <br/>
> <br/>
> Once the call is made, the API executes the query against the specified object and returns a query response object to your application. Your application can then iterate through rows in the query response to retrieve information.<br/>
> <br/>
> ## Limitations <br/>
> <br/>
> This call has the following limitations:<br/>
> <br/>
> * All ZOQL keywords must be in lower case.<br/>
> * The number of records returned is limited to 2000 records<br/>
> * The Invoice Settlement feature is not supported. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. The Orders feature is also not supported.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### QueryMore

> Use queryMore to request additional results from a previous query call. If your initial query call returns more than 2000 results, you can use queryMore to query for the additional results.<br/>
> <br/>
> <br/>
> Any `queryLocator` results greater than 2,000, will only be stored by Zuora for 5 days before it is deleted.<br/>
> <br/>
> <br/>
>  This call sends a request for additional results from an initial query call. If the initial query call returns more than 2000 results, you can use the `queryLocator` returned from query to request the next set of results.<br/>
> <br/>
> <br/>
> **Note:** Zuora expires queryMore cursors after 15 minutes of activity.<br/>
> <br/>
> <br/>
> To use queryMore, you first construct a query call. By default, the query call will return up to 2000 results. If there are more than 2000 results, query will return a boolean `done`, which will be marked as `false`, and a `queryLocator`, which is a marker you will pass to queryMore to get the next set of results.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Subscribe

> This call performs many actions.  Use the subscribe call to bundle information required to create at least one new subscription.<br/>
> <br/>
> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> <br/>
> The call takes in an array of SubscribeRequests. Because it takes an array, you can submit a batch of subscription requests at once. You can create up to 50 different subscriptions in a single subscribe call.<br/>
> <br/>
> This is a combined call that you can use to perform all of the following tasks in a single call:<br/>
> <br/>
> * Create accounts<br/>
> * Create contacts<br/>
> * Create payment methods, including external payment options<br/>
> * Create an invoice for the subscription<br/>
> * Apply the first payment to a subscription<br/>
> <br/>
> ## Object Limits <br/>
> 50 objects are supported in a single call.<br/>
> <br/>
> <br/>
> <br/>
> ## Effective Date<br/>
> If the effective date is in the future, the invoices will not be generated, and there will be no invoice number.<br/>
> <br/>
> ## Subscription Name, Number, and ID <br/>
> ### Subscription Name and Number <br/>
> The subscription name is a unique identifier for the subscription. If you do not specify a value for the name, Zuora will create one automatically. The automatically generated value is known as the subscription number, such as `A-S00000080`. You cannot change the subscription name or number after creating the subscription. <br/>
> <br/>
> * **Subscription name**: The name that you set for the subscription.<br/>
> * **Subscription number**: The value generated by Zuora automatically if you do not specify a subscription name. <br/>
> <br/>
> Both the subscription name and number must be unique. If they are not, an error will occur.<br/>
> <br/>
> ### Subscription ID <br/>
> The subscription ID is a 32-digit ID in the format 4028xxxx. This is also the unique identifier for a subscription. This value is automatically generated by the system and cannot be edited or updated, but it can be queried. One subscription can have only one subscription name or number, but it can have multiple IDs: Each version of a subscription has a different ID.<br/>
> <br/>
> The Subscription object contains the fields `OriginalId` and `PreviousSubscriptionId`. `OriginalId` is the ID for the first version of a subscription. `PreviousSubscriptionId` is the ID of the version created immediately prior to the current version.<br/>
> <br/>
> ## Subscription Preview <br/>
> You can preview invoices that would be generated by the subscribe call. <br/>
> <br/>
> ## Invoice Subscriptions Separately<br/>
> If you have enabled the invoice subscriptions separately feature, a subscribe call will generate an invoice for each subscription for every subscription where the field `IsInvoiceSeparate` is set to `true`.<br/>
> <br/>
> If the invoice subscriptions separately feature is disabled, a subscribe call will generate a single invoice for all subscriptions.<br/>
> <br/>
> See [Invoicing Subscriptions Separately](https://knowledgecenter.zuora.com/BC_Subscription_Management/Subscriptions/B_Creating_Subscriptions/Invoicing_Subscriptions_Separately) for more information.<br/>
> <br/>
> ## Subscriptions and Draft Invoices <br/>
> If a draft invoice that includes charges exists in a customer account, using the subscribe call to create a new subscription and generate an invoice will cause the new subscription to be added to the existing draft invoice. Zuora will then post the invoice. <br/>
> <br/>
> ## When to Use Subscribe and Create Calls <br/>
> You can use either the subscribe call or the create call to create the objects associated with a subscription (accounts, contacts, and so on). There are differences between these calls, however, and some situations are better for one or the other.<br/>
> <br/>
> ### Use the Subscribe Call <br/>
> The subscribe call bundles up all the information you need for a subscription. Use the subscribe call to create new subscriptions when you have all the information you need.<br/>
> <br/>
> Subscribe calls cannot update BillTo, SoldTo, and Account objects. Payment information objects cannot be updated if there is an existing account ID in the call. These objects are not supported in a subscribe call.<br/>
> <br/>
> ### Use the Create Call <br/>
> The create call is more useful when you want to develop in stages. For example, if you want to first create an account, then a contact, and so on. If you do not have all information available, use the create call. To create a subscription, you must activate the account from Draft status to Active by calling the subscribe call.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Update

> Updates the information in one or more objects of the same type. You can specify different types of objects in different update calls, but each specific update call must apply to only one type of object.<br/>
> <br/>
> You can update an array of one or more zObjects. It returns an array of SaveResults, indicating the success or failure of updating each object. The following information applies to this call:<br/>
> <br/>
> * You cannot pass in null zObjects.<br/>
> * You can pass in a maximum of 50 zObjects at a time.<br/>
> * All objects must be of the same type.<br/>
> * For each field in each object, you must determine that object's ID. Then populate the fields that you want update with the new information.<br/>
> * Zuora ignores unrecognized fields in update calls. For example, if an optional field is spelled incorrectly or a field that does not exist is specified, Zuora ignores the field and continues to process the call. No error message is returned for unrecognized fields.<br/>
> <br/>
> ## Object Limits <br/>
> 50 objects are supported in a single call.

*Tags:* `Actions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Get amendments by subscription ID

> Retrieves detailed information about the amendment with the specified subscription.

*Tags:* `Amendments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `subscription-id` - _required_ - The ID of the subscription whose amendment changes you want to retrieve.

### Get amendments by key

> Retrieves detailed information about the specified subscription amendment.

*Tags:* `Amendments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `amendment-key` - _required_ - Can be the amendment ID or the amendment code.

### Add attachments

> Use the Add Attachment REST request with a multipart/form-data to attach a document file to an Account, a Subscription, or an Invoice.

*Tags:* `Attachments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `description` - _optional_ - Description of the attachment document.

* `associatedObjectType` - _required_ - Specify one of the following values: Account, Subscription, or Invoice.

* `associatedObjectKey` - _required_ - For the Subscription type, specify the Subscription Number. An attachment is tied to the Subscription Number and thus viewable with every subscription version.

For Account and Invoice, specify the id.


### Delete attachments

> Use the Delete Attachment REST request to delete an attachment from a Zuora object.

*Tags:* `Attachments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `attachment-id` - _required_ - Id of the attachment to be deleted.

### View attachments

> Use the View Attachment REST request to retrieve information about an attachment document.

*Tags:* `Attachments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `attachment-id` - _required_ - Id of the attachment you want to view.

### Edit attachments

> Use the Edit Attachment REST request to make changes to the descriptive fields of an attachment, such as the description and the file name. You cannot change the actual content of the attached file in Zuora. If you need to change the actual content, you need to delete the attachment and add the updated file as a new attachment.

*Tags:* `Attachments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `attachment-id` - _required_ - Id of the attachment to be updated.

### View attachments list

> Use the View Attachment REST request to get a list of attachments on an account, an invoice, or a subscription.

*Tags:* `Attachments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `object-type` - _required_ - The type of object to list attachements for.

    Possible values: account, invoice, subscription.
* `object-key` - _required_ - ID of the object to list attachements for.
 - If `object-type` is `account`, specify an account ID.
 - If `object-type` is `invoice`, specify an invoice ID.
 - If `object-type` is `subscription`, specify a subscription number.


### Email billing documents generated from bill run

> Manually emails all the billing documents that are generated from a specified bill run to your customers. <br/>
> <br/>
> <br/>
> Bill runs can generate invoices and credit memos based on your [invoice and credit memo generation rule](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/Credit_and_Debit_Memos/Rules_for_Generating_Invoices_and_Credit_Memos). Credit memos are only available if you have the Invoice Settlement feature enabled.<br/>
> <br/>
> <br/>
> Using this API operation, the billing documents are sent to the email addresses specified in the **To Email** field of the email templates. The email template used for each billing document is set in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. See [Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information about how to edit the **To Email** field in the email template.<br/>
> <br/>
> <br/>
> <br/>
> <br/>
> <br/>
> ## Notes<br/>
>   - Even though no field is required in the Request body, you still need to specify `{}` in the request. Otherwise, an error will be returned.<br/>
> <br/>
> <br/>
>   - You can only email posted billing documents.<br/>
>   <br/>
>   <br/>
>   - You must activate the following notifications before emailing invoices and credit memos:<br/>
>     - **Manual Email For Invoice | Manual Email For Invoice** <br/>
>     - **Email Credit Memo | Manually email Credit Memo**<br/>
>  <br/>
>   <br/>
>   - To include the invoice PDF in the email, select the **Include Invoice PDF** check box in the **Edit notification** dialog from the Zuora UI. To include the credit memo PDF in the email, select the **Include Credit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.<br/>
> <br/>
> <br/>
> <br/>
>   - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the following templates are used for billing documents:<br/>
>     - Invoices: **Invoice Posted Default Email Template**<br/>
>     - Credit memos: **Manual Email for Credit Memo Default Template**  <br/>
> <br/>
>     See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.

*Tags:* `Bill Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `billRunId` - _required_ - The ID of the bill run. For example, 2c92c8f95d0c886e015d11287a8f0f8b.


### Get billing documents

> Retrieves the information about all billing documents associated with a specified account. The billing documents contain invoices, credit memos, and debit memos. <br/>
> <br/>
> To retrieve information about credit memos and debit memos, you must have the Invoice Settlement feature enabled.

*Tags:* `Billing Documents`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `accountId` - _required_ - The ID of the customer account that the billing documents are associated with. 

* `documentDate` - _optional_ - The date of the billing document. It represents the invoice date for invoices, credit memo date for credit memos, and debit memo date for debit memos.

* `status` - _optional_ - The status of the billing document.

    Possible values: Draft, Posted, Canceled, Error.
* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

If you do not specify any sortable field, the response data is sorted by the `documentDate` field in descending order.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.  

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - documentDate
  - documentType
  
Examples:
- /billing-documents?accountId=4028905f5e4feb38015e50af9aa002d1
  &sort=+documentDate,-documentType
- /billing-documents?accountId=4028905f5e4feb38015e50af9aa002d1
  &status=Posted&sort=+documentDate&page=2&pageSize=15


### Create Billing Preview Run

> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> <br/>
> Creates billing preview runs for multiple customer accounts.<br/>
> <br/>
> You can run up to 10 billing previews in batches concurrently. A single batch of customer accounts can only have one billing preview run at a time. So you can have up to 10 batches running at the same time. If you create a billing preview run for all customer batches, you cannot create another billing preview run until this preview run is completed.

*Tags:* `Billing Preview Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get Billing Preview Run

> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> <br/>
> Retrieves a preview of future invoice items for multiple customer accounts through a billing preview run. If you have the Invoice Settlement feature enabled,  you can also retrieve a preview of future credit memo items. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> A billing preview run asynchronously generates a downloadable CSV file containing a preview of invoice item data and credit memo item data for a batch of customer accounts.

*Tags:* `Billing Preview Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `billingPreviewRunId` - _required_ - Id of the billing preview run.


### Perform mass action

> This reference describes how to perform a mass action through the REST API. <br/>
> <br/>
> Using this API method, you send a multipart/form-data request containing a `.csv` file with data about the mass action you want to perform. Zuora returns a key and then asynchronously processes the mass action. You can use the key to get details about the result of the mass action.

*Tags:* `Mass Updater`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get mass action result

> This reference describes how to get information about the result of a mass action through the REST API.

*Tags:* `Mass Updater`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `bulk-key` - _required_ - String of 32 characters that identifies a mass action. You get the bulk-key after performing a mass action through the REST API.


### Stop mass action

> This reference describes how to stop a mass action through the REST API. You can stop a mass action when its status is Pending or Processing. After you have stopped a mass action, you can get the mass action result to see details of the mass action.<br/>
> <br/>
> - If you stop a mass action when its status is Pending, no response file is generated because no records have been processed.<br/>
> <br/>
> - If you stop a mass action when its status is Processing, a response file is generated. You can check the response file to see which records have been processed and which have not. In the response file, the **Success** column has the value `Y` (successful) or `N` (failed) for processed records, and a blank value for unprocessed records.<br/>
> <br/>
> Records that have already been processed when a mass action is stopped are not rolled back.

*Tags:* `Mass Updater`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `bulk-key` - _required_ - String of 32 characters that identifies a mass action. You get the bulk-key after performing a mass action through the REST API.


### Get product

> Retrieves detailed information about a specific product, including information about its product rate plans and charges.

*Tags:* `Catalog`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the `productRatePlans` field.

* `product-id` - _required_ - The unique ID of the product you want to retrieve. For example, 8a808255575bdae4015774e9602e16fe.

### Get product catalog

> Retrieves the entire product catalog, including all products, features, and their corresponding rate plans, charges. Products are returned in reverse chronological order on the UpdatedDate field. <br/>
> <br/>
> With rate plans and rate plan charges, the REST API has a maximum array size.

*Tags:* `Catalog`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the `productRatePlans` field.


### Multi-entity: Share a product with an Entity

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Shares a product with a target entity. Zuora synchronizes the shared products to the target entity after sharing. For more information about product sharing, see [Products Sharing Across Entities](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/C_Business_Objects_Sharing_Across_Entities/B_Products_Sharing_Across_Entities).<br/>
> <br/>
> Note that:<br/>
> <br/>
> - You must finish all the [prerequisites](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity/C_Business_Objects_Sharing_Across_Entities/B_Products_Sharing_Across_Entities/Share_Products) before sharing products with other entities. <br/>
> <br/>
> - Only source entity administrators have permission to share products with other entities. You must make the call as a source entity administrator.<br/>
> <br/>
> - Currently, you can only share a product with one entity at a time. An error occurs if you try to share a product to more than one entity.

*Tags:* `Catalog`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `product-id` - _required_ - The unique ID of the product you want to share. For example, 8a808255575bdae4015774e9602e16fe.

### Get charge summary details by charge ID

> This REST API reference describes how to retrieve the details of a charge revenue summary by specifying the subscription charge ID. This response retrieves all revenue items associated with a charge revenue summary.

*Tags:* `Charge Revenue Summaries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `charge-key` - _required_ - ID of the subscription rate plan charge; for example, 402892793e173340013e173b81000012.


### Get charge summary details by CRS number

> This REST API reference describes how to retrieve the details of a charge revenue summary by specifying the charge revenue summary number. The response includes all revenue items associated with the charge revenue summary.

*Tags:* `Charge Revenue Summaries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `crs-number` - _required_ - The charge revenue summary number.


### Establish connection to Zuora REST API service

> Establishes a connection to the Zuora REST API service based on a valid user credentials. <br/>
> <br/>
> **Note:**This is a legacy REST API. Zuora recommends you to use [OAuth](https://www.zuora.com/developer/api-reference/#section/Authentication/OAuth-v2.0) for authentication instead. <br/>
> <br/>
> This call authenticates the user and returns an API session cookie that's used to authorize subsequent calls to the REST API. The credentials must belong to a user account that has permission to access the API service.<br/>
> <br/>
> As noted elsewhere, it's strongly recommended that an account used for Zuora API activity is never used to log into the Zuora UI.  Once an account is used to log into the UI, it may be subject to periodic forced password changes, which may eventually lead to authentication failures when using the API.

*Tags:* `Connections`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `apiAccessKeyId` - _required_ - Account username

* `apiSecretAccessKey` - _required_ - Account password

* `Content-Type` - _required_ - Must be set to "application/json"


### Get credit memos

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all credit memos.<br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`. <br/>
>   <br/>
> Examples:<br/>
> <br/>
> - /v1/creditmemos?status=Processed<br/>
> <br/>
> - /v1/creditmemos?referredInvoiceId=null&status=Draft<br/>
> <br/>
> - /v1/creditmemos?status=Processed&type=External&sort=+number

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `accountId` - _optional_ - This parameter filters the response based on the `accountId` field. 

* `amount` - _optional_ - This parameter filters the response based on the `amount` field. 

* `appliedAmount` - _optional_ - This parameter filters the response based on the `appliedAmount` field. 

* `autoApplyUponPosting` - _optional_ - This parameter filters the response based on the `autoApplyUponPosting` field. 

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field. 

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field. 

* `creditMemoDate` - _optional_ - This parameter filters the response based on the `creditMemoDate` field. 

* `currency` - _optional_ - This parameter filters the response based on the `currency` field. 

* `excludeFromAutoApplyRules` - _optional_ - This parameter filters the response based on the `excludeFromAutoApplyRules` field. 

* `number` - _optional_ - This parameter filters the response based on the `number` field. 

* `referredInvoiceId` - _optional_ - This parameter filters the response based on the `referredInvoiceId` field. 

* `refundAmount` - _optional_ - This parameter filters the response based on the `refundAmount` field. 

* `status` - _optional_ - This parameter filters the response based on the `status` field. 

    Possible values: Draft, Posted, Canceled, Error, PendingForTax, Generating, CancelInProgress.
* `targetDate` - _optional_ - This parameter filters the response based on the `targetDate` field. 

* `taxAmount` - _optional_ - This parameter filters the response based on the `taxAmount` field. 

* `totalTaxExemptAmount` - _optional_ - This parameter filters the response based on the `totalTaxExemptAmount` field.

* `transferredToAccounting` - _optional_ - This parameter filters the response based on the `transferredToAccounting` field. 

    Possible values: Processing, Yes, No, Error, Ignore.
* `unappliedAmount` - _optional_ - This parameter filters the response based on the `unappliedAmount` field. 

* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field. 

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by credit memo number.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - accountId
  - amount
  - appliedAmount
  - createdById
  - createdDate
  - creditMemoDate
  - number
  - referredInvoiceId
  - refundAmount
  - status
  - targetDate
  - taxAmount
  - totalTaxExemptAmount
  - transferredToAccounting
  - unappliedAmount
  - updatedDate

  
Examples:

- /v1/creditmemos?sort=+number

- /v1/creditmemos?status=Processed&sort=-number,+amount


### Create credit memo from charge

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates an ad-hoc credit memo from a product rate plan charge. Zuora supports the creation of credit memos from any type of product rate plan charge. The charges can also have any amount and any charge model, except for discout charge models. <br/>
> <br/>
> You can create a credit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control. 

This header affects the availability of the following fields:
* amount
* memoItemAmount


### Request breakdown of credit memo items by order

> **Note:** This operation is only available if you have the [Invoice Settlement](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement) and [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) features enabled. If you wish to have access to the features, submit a request at [Zuora Global Support](http://support.zuora.com/). If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> <br/>
> Retrieve specified credit memo items which are broken down by orders. One credit memo item might be broken down into a list of order related items.<br/>
> <br/>
> You can only use this operation to retrieve breakdowns of credit memos whose source value is `BillRun` or `API`.<br/>
> <br/>
> The maximum number of credit memo items to retrieve is 1000.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Deletes a credit memo. Only credit memos with the Cancelled status can be deleted. <br/>
> <br/>
> You can delete a credit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about a specific credit memo.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Update credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Updates the basic and finance information about a credit memo. Currently, Zuora supports updating tax-exclusive memo items, but does not support updating tax-inclusive memo items. <br/>
> <br/>
> If the amount of a memo item is updated, the tax will be recalculated in the following conditions:<br/>
>   - The memo is created from a product rate plan charge and you use Avalara to calculate the tax.<br/>
>   - The memo is created from an invoice and you use Avalara or Zuora Tax to calculate the tax.<br/>
> <br/>
> You can update a credit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172. 


### Apply credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Applies a posted credit memo to one or more invoices and debit memos. <br/>
> <br/>
> You can apply a credit memo to an invoice or a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.<br/>
> <br/>
> When applying a credit memo, the total number of invoices and debit memos that the credit memo will apply to must be less than or equal to 1,000.<br/>
> <br/>
> If the Proration application rule is used, when applying credit memos, the following quantity must be less than or equal to 10,000: <br/>
> <br/>
> (number of invoice items + number of debit memo items) * number of credit memo items<br/>
> <br/>
> Otherwise, the First In First Out rule will be used instead of the Proration rule.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Cancel credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Cancels a credit memo. Only credit memos with the Draft status can be cancelled. <br/>
> <br/>
> You can cancel a credit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Email credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Sends a posted credit memo to the specified email addresses manually.<br/>
> <br/>
> <br/>
> <br/>
> ## Notes<br/>
>   - You must activate the **Email Credit Memo | Manually email Credit Memo** notification before emailing credit memos. To include the credit memo PDF in the email, select the **Include Credit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.<br/>
> <br/>
> <br/>
>   - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Manual Email for Credit Memo Default Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.<br/>
> <br/>
> <br/>
>   - The credit memos are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:<br/>
> <br/>
>     * The `useEmailTemplateSetting` field is set to `false`.<br/>
>     * The email addresses are not specified in the `emailAddresses` field.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The ID of a posted credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get credit memo items

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all items of a credit memo. A credit memo item is a single line item in a credit memo. <br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`. <br/>
> <br/>
> Examples:<br/>
>     <br/>
>   - /v1/creditmemos/402890245c7ca371015c7cb40ac30015/items?amount=100<br/>
>   <br/>
>   - /v1/creditmemos/402890245c7ca371015c7cb40ac30015/items?amount=100&sort=createdDate

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control. 

This header affects the availability of the following fields:
* creditTaxItems
* taxationItems

* `amount` - _optional_ - This parameter filters the response based on the `amount` field. 

* `appliedAmount` - _optional_ - This parameter filters the response based on the `appliedAmount` field. 

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field. 

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field. 

* `id` - _optional_ - This parameter filters the response based on the `id` field. 

* `refundAmount` - _optional_ - This parameter filters the response based on the `refundAmount` field. 

* `serviceEndDate` - _optional_ - This parameter filters the response based on the `serviceEndDate` field. 

* `serviceStartDate` - _optional_ - This parameter filters the response based on the `serviceStartDate` field. 

* `sku` - _optional_ - This parameter filters the response based on the `sku` field. 

* `skuName` - _optional_ - This parameter filters the response based on the `skuName` field. 

* `sourceItemId` - _optional_ - This parameter filters the response based on the `sourceItemId` field. 

* `subscriptionId` - _optional_ - This parameter filters the response based on the `subscriptionId` field.

* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field. 

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by updated date.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - amount
  - appliedAmount
  - createdById
  - createdDate
  - id
  - refundAmount
  - serviceEndDate
  - serviceStartDate
  - sku
  - skuName
  - sourceItemId
  - subscriptionId
  - updatedById
  - updatedDate
  
Examples:

- /v1/creditmemos/402890245c7ca371015c7cb40ac30015/items?sort=createdDate

- /v1/creditmemos/402890245c7ca371015c7cb40ac30015/items?amount=100&sort=createdDate


### Get credit memo item

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the information about a specific item of a credit memo. A credit memo item is a single line item in a credit memo.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `cmitemid` - _required_ - The unique ID of a credit memo item. You can get the credit memo item ID from the response of [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems).

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control. 

This header affects the availability of the following fields:
* creditTaxItems
* taxationItems


### Get taxation items of credit memo item

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves information about the taxation items of a specific credit memo item.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `page` - _optional_ - Page number.

* `cmitemid` - _required_ - The unique ID of a credit memo item. You can get the credit memo item ID from the response of [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems).

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get credit memo parts

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all parts of a credit memo. A credit memo can consist of an unapplied part, and several parts applied to invoices and debit memos. You can use this operation to get all the applied and unapplied portions of a credit memo.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get credit memo part

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about a specific credit memo part. A credit memo can consist of an unapplied part, and several parts applied to invoices and debit memos.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `partid` - _required_ - The unique ID of a specific credit memo part. You can get the credit memo part ID from the response of [Get credit memo parts](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoParts).

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get credit memo part items

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all items of a credit memo part. A credit memo part item is a single line item in a credit memo part. A credit memo part can consist of several different types of items.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `partid` - _required_ - The unique ID of a specific credit memo part. You can get the credit memo part ID from the response of [Get credit memo parts](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoParts). .

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get credit memo part item

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the information about a specific credit memo part item.  A credit memo part item is a single line item in a credit memo part. A credit memo part can consist of several different types of items.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `partid` - _required_ - The unique ID of a specific credit memo part. You can get the credit memo part ID from the response of [Get credit memo parts](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoParts).

* `itempartid` - _required_ - The unique ID of a specific credit memo part item. You can get the credit memo part item ID from the response of [Get credit memo part items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItemParts).

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Create credit memo PDF

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates a PDF file for a specified credit memo. To access the generated PDF file, you can download it by clicking **View PDF** on the detailed credit memo page through the Zuora UI.<br/>
> <br/>
> This REST API operation can be used only if you have the Billing user permission "Regenerate PDF" enabled.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of the credit memo that you want to create a PDF file for. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Post credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Posts a credit memo to activate it. You can post credit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions).

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Create taxation items for credit memo

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates taxation items for a credit memo.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Unapply credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Unapplies an applied credit memo from one or more invoices and debit memos. The full applied amount from invoices and debit memos is transferred into the unapplied amount of the credit memo. <br/>
> <br/>
> You can unapply a credit memo from an invoice or a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.<br/>
> <br/>
> When unapplying a credit memo, the total number of invoices and debit memos that the credit memo will be unapplied from must be less than or equal to 1,000.<br/>
> <br/>
> If the Proration application rule is used, when unapplying credit memos, the following quantity must be less than or equal to 10,000: <br/>
> <br/>
> (number of invoice items + number of debit memo items) * number of credit memo items<br/>
> <br/>
> Otherwise, the First In First Out rule will be used instead of the Proration rule.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Unpost credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Unposts a credit memo that is in Posted status. If a credit memo has been applied or refunded, you are not allowed to unpost it. After a credit memo is unposted, its status becomes Draft. <br/>
> <br/>
> You can unpost credit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions).

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get breakdown of credit memo by order

> **Note:** This operation is only available if you have the [Invoice Settlement](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement) and [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) features enabled. If you wish to have access to the features, submit a request at [Zuora Global Support](http://support.zuora.com/). If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> <br/>
> Retrieves a specified credit memo that is broken down by orders. One credit memo item might be broken down into a list of order related items.<br/>
> <br/>
> You can only use this operation to retrieve breakdowns of credit memos whose source value is `BillRun` or `API`.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditMemoNumber` - _required_ - Number of credit memo to be broken down.

### Refund credit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Refunds a full or partial posted credit memo to your customers. Only the amount of unapplied part could be refunded. <br/>
> <br/>
> You can refund a credit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Credit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `creditmemoId` - _required_ - The unique ID of a credit memo. For example, 8a8082e65b27f6c3015ba45ff82c7172.


### Get custom foreign currency exchange rates

> This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> This reference describes how to query custom foreign exchange rates from Zuora. You can use this API method to query exchange rates only if you use a custom exchange rate provider and upload rates with the Import Foreign Exchange Rates mass action.

*Tags:* `Custom Exchange Rates`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `currency` - _required_ - The target base currency of the tenant. The exchange rates in the response are calculated in relation to the target currency.

The value must be a three-letter currency code, for example, USD. 

* `startDate` - _required_ - Start date of the date range for which you want to get exchange rates.

The date must be in yyyy-mm-dd format, for example, 2016-01-15. The start date cannot be later than the end date.

* `endDate` - _required_ - End date of the date range for which you want to get exchange rates.

The date must be in yyyy-mm-dd format, for example, 2016-01-16. The end date can be a maximum of 90 days after the start date.


### Get debit memos

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the information about all debit memos associated with all customer accounts.<br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`. <br/>
> <br/>
> Examples:<br/>
> <br/>
> - /v1/debitmemos?status=Processed<br/>
> <br/>
> - /v1/debitmemos?referredInvoiceId=null&status=Draft<br/>
> <br/>
> - /v1/debitmemos?status=Processed&type=External&sort=+number

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `accountId` - _optional_ - This parameter filters the response based on the `accountId` field.

* `amount` - _optional_ - This parameter filters the response based on the `amount` field.

* `balance` - _optional_ - This parameter filters the response based on the `balance` field.

* `beAppliedAmount` - _optional_ - This parameter filters the response based on the `beAppliedAmount` field.

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field.

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field.

* `currency` - _optional_ - This parameter filters the response based on the `currency` field.

* `debitMemoDate` - _optional_ - This parameter filters the response based on the `debitMemoDate` field.

* `dueDate` - _optional_ - This parameter filters the response based on the `dueDate` field.

* `number` - _optional_ - This parameter filters the response based on the `number` field.

* `referredInvoiceId` - _optional_ - This parameter filters the response based on the `referredInvoiceId` field.

* `status` - _optional_ - This parameter filters the response based on the `status` field.

    Possible values: Draft, Posted, Canceled, Error, PendingForTax, Generating, CancelInProgress.
* `targetDate` - _optional_ - This parameter filters the response based on the `targetDate` field.

* `taxAmount` - _optional_ - This parameter filters the response based on the `taxAmount` field.

* `totalTaxExemptAmount` - _optional_ - This parameter filters the response based on the `totalTaxExemptAmount` field.

* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field.

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by debit memo number.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - number
  - accountId
  - debitMemoDate
  - targetDate
  - dueDate
  - amount
  - taxAmount
  - totalTaxExemptAmount
  - balance
  - beAppliedAmount
  - referredInvoiceId
  - createdDate
  - createdById
  - updatedDate
  - updatedById
  
Examples:

- /v1/debitmemos?sort=+number

- /v1/debitmemos?status=Processed&sort=-number,+amount


### Create debit memo from charge

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates an ad-hoc debit memo from a product rate plan charge. Zuora supports the creation of debit memos from any type of product rate plan charge. The charges can also have any amount and any charge model, except for discout charge models.<br/>
> <br/>
>  You can create a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control. 

This header affects the availability of the following fields:
* amount
* memoItemAmount


### Update debit memos

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Updates the due date for multiple debit memos in batches with one call.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Deletes a debit memo. Only debit memos with the Cancelled status can be deleted. <br/>
> <br/>
> You can delete a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Get debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about a specific debit memo.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Update debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Updates the basic and finance information about a debit memo. Currently, Zuora supports updating tax-exclusive memo items, but does not support updating tax-inclusive memo items. <br/>
> <br/>
> If the amount of a memo item is updated, the tax will be recalculated in the following conditions:<br/>
>   - The memo is created from a product rate plan charge and you use Avalara to calculate the tax.<br/>
>   - The memo is created from an invoice and you use Avalara or Zuora Tax to calculate the tax.<br/>
> <br/>
> You can update a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Get debit memo application parts

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves information about the payments or credit memos that are applied to a specified debit memo.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Cancel debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Cancels a debit memo. Only debit memos with the Draft status can be cancelled. <br/>
> <br/>
> You can cancel a debit memo only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Email debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Sends a posted debit memo to the specified email addresses manually.<br/>
> <br/>
> <br/>
> <br/>
> ## Notes<br/>
>   - You must activate the **Email Debit Memo | Manually email Debit Memo** notification before emailing debit memos. To include the debit memo PDF in the email, select the **Include Debit Memo PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.<br/>
> <br/>
> <br/>
>   - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Manual Email for Debit Memo Default Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.<br/>
> <br/>
> <br/>
>   - The debit memos are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:<br/>
> <br/>
>     * The `useEmailTemplateSetting` field is set to `false`.<br/>
>     * The email addresses are not specified in the `emailAddresses` field.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The ID of a posted debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Get debit memo items

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all items of a debit memo. A debit memo item is a single line item in a debit memo. <br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`. <br/>
> <br/>
> Examples:<br/>
> <br/>
> - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100<br/>
> <br/>
> - /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100&sort=createdDate

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control. 

This header affects the availability of the following fields:
* taxItems
* taxationItems

* `amount` - _optional_ - This parameter filters the response based on the `amount` field.

* `beAppliedAmount` - _optional_ - This parameter filters the response based on the `beAppliedAmount` field.

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field.

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field.

* `id` - _optional_ - This parameter filters the response based on the `id` field.

* `serviceEndDate` - _optional_ - This parameter filters the response based on the `serviceEndDate` field.

* `serviceStartDate` - _optional_ - This parameter filters the response based on the `serviceStartDate` field.

* `sku` - _optional_ - This parameter filters the response based on the `sku` field.

* `skuName` - _optional_ - This parameter filters the response based on the `skuName` field.

* `sourceItemId` - _optional_ - This parameter filters the response based on the `sourceItemId` field.

* `subscriptionId` - _optional_ - This parameter filters the response based on the `subscriptionId` field.

* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field.

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by updated date.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - id
  - amount
  - beAppliedAmount
  - sku
  - skuName
  - serviceStartDate
  - serviceEndDate
  - sourceItemId
  - createdDate
  - createdById
  - updatedDate
  - updatedById
  - subscriptionId
  
Examples:

- /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?sort=createdDate

- /v1/debitmemos/402890245c7ca371015c7cb40b28001f/items?amount=100&sort=createdDate


### Get debit memo item

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves information about a specific item of a debit memo. A debit memo item is a single line item in a debit memo.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `dmitemid` - _required_ - The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems).

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. See [Minor Version](https://www.zuora.com/developer/api-reference/#section/API-Versions/Minor-Version) for information about REST API version control. 

This header affects the availability of the following fields:
* taxItems
* taxationItems


### Get taxation items of debit memo item

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves information about the taxation items of a specific debit memo item.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `page` - _optional_ - Page number.

* `dmitemid` - _required_ - The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems).

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Create debit memo PDF

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates a PDF file for a specified debit memo. To access the generated PDF file, you can download it by clicking **View PDF** on the detailed debit memo page through the Zuora UI.<br/>
> <br/>
> This REST API operation can be used only if you have the Billing user permission "Regenerate PDF" enabled.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of the debit memo that you want to create a PDF file for. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Post debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Posts a debit memo to activate it. You can post debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions).

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Create taxation items for debit memo

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates taxation items for a debit memo.

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Unpost debit memo

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Unposts a debit memo that is in Posted status. If any credit memo or payment has been applied to a debit memo, you are not allowed to unpost the debit memo. After a debit memo is unposted, its status becomes Draft.<br/>
> <br/>
> You can unpost debit memos only if you have the [Billing permissions](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles#Billing_Permissions).

*Tags:* `Debit Memos`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `debitMemoId` - _required_ - The unique ID of a debit memo. For example, 8a8082e65b27f6c3015ba419f3c2644e.


### Describe object

> Provides a reference listing of each object that is available in your Zuora tenant.<br/>
> <br/>
> The information returned by this call is useful if you are using [CRUD: Create Export](https://www.zuora.com/developer/api-reference/#operation/Object_POSTExport) or the [AQuA API](https://knowledgecenter.zuora.com/DC_Developers/T_Aggregate_Query_API) to create a data source export. See [Export ZOQL](https://knowledgecenter.zuora.com/DC_Developers/M_Export_ZOQL) for more information.<br/>
> <br/>
> ## Response<br/>
> The response contains an XML document that lists the fields of the specified object. Each of the object's fields is represented by a `<field>` element in the XML document.<br/>
>     <br/>
> Each `<field>` element contains the following elements:<br/>
> <br/>
> | Element      | Description                                                                                                                                                                                                                                                                                  |<br/>
> |--------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|<br/>
> | `<name>`     | API name of the field.                                                                                                                                                                                                                                                                       |<br/>
> | `<label>`    | Name of the field in the Zuora user interface.                                                                                                                                                                                                                                               |<br/>
> | `<type>`     | Data type of the field. The possible data types are: `boolean`, `date`, `datetime`, `decimal`, `integer`, `picklist`, `text`, `timestamp`, and `ZOQL`. If the data type is `picklist`, the `<field>` element contains an `<options>` element that lists the possible values of the field.    |<br/>
> | `<contexts>` | Specifies the availability of the field. If the `<contexts>` element lists the `export` context, the field is available for use in data source exports.                                                                                                                                                |<br/>
> <br/>
> The `<field>` element contains other elements that provide legacy information about the field. This information is not directly related to the REST API.<br/>
> <br/>
> Response sample:<br/>
> ```xml<br/>
> <?xml version="1.0" encoding="UTF-8"?><br/>
> <object><br/>
>   <name>ProductRatePlanCharge</name><br/>
>   <label>Product Rate Plan Charge</label><br/>
>   <fields><br/>
>     ...<br/>
>     <field><br/>
>       <name>TaxMode</name><br/>
>       <label>Tax Mode</label><br/>
>       <type>picklist</type><br/>
>       <options><br/>
>         <option>TaxExclusive</option><br/>
>         <option>TaxInclusive</option><br/>
>       </options><br/>
>       <contexts><br/>
>         <context>export</context><br/>
>       </contexts><br/>
>       ...<br/>
>     </field><br/>
>     ...<br/>
>   </fields><br/>
> </object><br/>
> ```<br/>
> <br/>
> It is strongly recommended that your integration checks `<contexts>` elements in the response. If your integration does not check `<contexts>` elements, your integration may process fields that are not available for use in data source exports. See [Changes to the Describe API](https://knowledgecenter.zuora.com/DC_Developers/M_Export_ZOQL/Changes_to_the_Describe_API) for more information.

*Tags:* `Describe`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `object` - _required_ - API name of an object in your Zuora tenant. For example, `InvoiceItem`. See [Zuora Object Model](https://www.zuora.com/developer/api-reference/#section/Zuora-Object-Model) for the list of valid object names.

Depending on the features enabled in your Zuora tenant, you may not be able to list the fields of some objects.


### Create document properties

> **Note:** This feature is available only if you have the Billing Document Properties Setup feature enabled. The Billing Document Properties Setup feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates custom document properties for a billing document. For example, a document property can be a custom name used for files generated for billing documents. Billing documents include invoices, credit memos, and debit memos.<br/>
> <br/>
> If you want to configure custom file names for billing documents created through API operations, you have to call this operation before posting the billing documents. <br/>
> <br/>
> **Note:** You can create document properties for credit and debit memos only if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).

*Tags:* `Document Properties`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### Delete document properties

> **Note:** This feature is available only if you have the Billing Document Properties Setup feature enabled. The Billing Document Properties Setup feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Deletes document properties with a specific ID for a billing document. Billing documents include invoices, credit memos, and debit memos.<br/>
> <br/>
> **Note:** You can delete document properties for credit and debit memos only if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).

*Tags:* `Document Properties`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `documentPropertiesId` - _required_ - The unique ID of document properties. For example, 402892c74c9193cd014c96bbe7c101f9.


### Update document properties

> **Note:** This feature is available only if you have the Billing Document Properties Setup feature enabled. The Billing Document Properties Setup feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Updates document properties with a specific ID for a billing document. Billing documents include invoices, credit memos, and debit memos.<br/>
> <br/>
> **Note:** You can update document properties for credit and debit memos only if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).

*Tags:* `Document Properties`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `documentPropertiesId` - _required_ - The unique ID of document properties to be updated. For example, 402892c74c9193cd014c96bbe7c101f9.


### Get document properties

> **Note:** This feature is available only if you have the Billing Document Properties Setup feature enabled. The Billing Document Properties Setup feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
>  Retrieve information about document properties of a billing document. Billing documents include invoices, credit memos, and debit memos.<br/>
>  <br/>
>  **Note:** You can retrieve information about document properties of credit and debit memos only if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).

*Tags:* `Document Properties`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `documentType` - _required_ - The type of the billing document. 

    Possible values: Invoice, CreditMemo, DebitMemo.
* `documentId` - _required_ - The unique ID of document properties to be retrieved. For example, 402892c74c9193cd014c96bbe7c101f9.


### Multi-entity: Get entities

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> <br/>
> Retrieves detailed information of certain entities in a multi-entity hierarchy.<br/>
> <br/>
> <br/>
> You can retrieve:<br/>
> <br/>
>  - Provisioned entities<br/>
>   <br/>
>  - Unprovisioned entities<br/>
>   <br/>
>  - Both provisioned and unprovisioned entities<br/>
> <br/>
> ## User Access Permission<br/>
> <br/>
> You can make the call as any entity user.

*Tags:* `Entities`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `provisioned` - _optional_ - Specify whether to retrieve provisioned or unprovisioned entities:

- `true`: Provisioned entities

- `false`: Unprovisioned entities


If you do not specify this field in the request, both the provisioned and unprovisioned entities are returned.


### Multi-entity: Create entity

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates an entity in a multi-entity hierarchy.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as a global entity administrator.<br/>
> <br/>
> ## Notes<br/>
> * We recommend that you assign only one administrator to manage the entity hierarchy, because an administrator of the global entity by default can only access to the entities that are created by themselves.

*Tags:* `Entities`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Multi-entity: Delete entity

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Removes an entity and its sub-entities from a multi-entity hierarchy. You can only remove unprovisioned entities. An error occurred when you remove a provisioned entity.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as a global entity administrator.

*Tags:* `Entities`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - Specify the Id of the entity that you want to delete. You can get the entity Id from the GET Entities call.

### Multi-entity: Get entity by Id

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves detailed information about a specified entity.<br/>
> <br/>
> ## User Access Permission<br/>
> You can make the call as any entity user.

*Tags:* `Entities`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - Specify the Id of the entity that you want to retrieve. You can get the entity Id from the GET Entities call.

### Multi-entity: Update entity

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Edits the following information about an unprovisioned entity:<br/>
> <br/>
>  - Name<br/>
>  <br/>
>  - Display name<br/>
>  <br/>
>  - Locale<br/>
>  <br/>
>  - Timezone<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as a global entity administrator.<br/>
> <br/>
> ## Notes<br/>
> * You are not allowed to edit the locale and time zone of the provisioned entities through the REST API.<br/>
> * You are not allowed to edit the display name of the global entity.

*Tags:* `Entities`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The Id of the entity that you want to edit. You can get the entity Id from the GET Entities call.

### Multi-entity: Provision entity

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Provisions an entity. You can only provision an entity if its parent entity is provisioned.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as a global entity administrator. <br/>
> <br/>
> ## Notes<br/>
> * Zuora does not allow you to remove a provisioned entity from the multi-entity hierarchy. So before you provision an entity, make sure that you put the entity in the correct place in the multi-entity hierarchy.

*Tags:* `Entities`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - Specify the Id of the entity that you want to provision.  You can get the entity Id from the GET Entities call.

### Multi-entity: Get connections

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves information about certain connections for a specified entity. You can specify the entity to retrieve in the `Zuora-Entity-Ids` request header.<br/>
> <br/>
> You can retrieve:<br/>
>  - Inbound connections<br/>
>  - Outbound connections<br/>
>  - Both inbound and outbound connections<br/>
> <br/>
> ## User Access Permission<br/>
> You can make the call as any entity user.

*Tags:* `Entity Connections`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `type` - _optional_ - Specifies whether to retrieve inbound or outbound connections for an entity.

Possible values:
 - `inbound`: All the incoming connections to the entity.
 - `outbound`: All the outgoing connections from the entity.

If you do not specify this field in the request, both the inbound and outbound connections are returned.

    Possible values: inbound, outbound.

### Multi-entity: Initiate connection

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Initiates a connection request from a source entity to a target entity.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as a source entity administrator. Also, this administrator must have permission to access to the target entity.

*Tags:* `Entity Connections`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Multi-entity: Accept connection

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Accepts a connection request.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as an entity administrator to accept a connection request.

*Tags:* `Entity Connections`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `connection-id` - _required_ - The ID of the connection that you want to accept.


### Multi-entity: Deny connection

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Denies a connection request.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as an entity administrator to deny a connection request.

*Tags:* `Entity Connections`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `connection-id` - _required_ - The ID of the connection that you want to deny.


### Multi-entity: Disconnect connection

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Disconnects an established connection. If you have shared objects from a global entity to a target entity, disconnecting the connection will break the mapping relationship between these entities and cannot be recovered later.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as an administrator of the target entity or source entity.

*Tags:* `Entity Connections`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `connection-id` - _required_ - The ID of the connection that you want to disconnect.


### Get files

> Retrieve files such as export results, invoices, and accounting period reports.<br/>
> <br/>
> **Note:** The maximum file size is 2047MB. If you have a data request that exceeds this limit, Zuora returns the following 403 response: `<security:max-object-size>2047MB</security:max-object-size>`. Submit a request at <a href="http://support.zuora.com/" target="_blank">Zuora Global Support</a> to determine if large file optimization is an option for you.

*Tags:* `Get Files`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `file-id` - _required_ - The Zuora ID of the file to retrieve.


### Return HMAC signatures

> This REST API reference describes how to return unique signature and token values that used to process a CORS enabled API call.

*Tags:* `HMAC Signatures`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Return hosted pages

> The hostedpages call returns the Payment Pages configuration metadata,<br/>
> specifically, page ID, page version, payment method type.<br/>
> <br/>
> The following are the version-specific and general REST requests for Payment Pages:<br/>
> <br/>
> * The request for Payment Pages 1.0 configuration information: `GET <BaseURL>/hostedpages?version=1`<br/>
> * The request for Payment Pages 2.0 configuration information: `GET <BaseURL>/hostedpages?version=2`<br/>
> * The request for all versions of Payment Pages configuration information: `GET <BaseURL>/hostedpages`<br/>
> <br/>
> ## Notes<br/>
> If you do not have the corresponding tenant setting enabled, e.g., the request `version` parameter set to 2 with the Payment Pages 2.0 setting disabled, you will receive an error.

*Tags:* `Hosted Pages`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `versionNumber` - _optional_ - Version of the Payment Pages for which you want to retrieve the configuration information. Specify 1 for Payment Pages 1.0 or 2 for Payment Pages 2.0. If omitted, information for all versions of Payment Pages are returned.

The response also depends on your tenant settings for Payment Pages 1.0 and Payment Pages 2.0. For example, if only the tenant setting for Payment Pages 2.0 is enabled, the response will only contain information for Payment Pages 2.0 forms even when this parameter is omitted.


### Update invoices

> Updates multiple invoices in batches with one call.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Request breakdown of invoice items by order

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the specified invoice items which are broken down by orders. One invoice item might be broken down into a list of order related items.<br/>
> <br/>
> The maximum number of invoice items to retrieve is 1000.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get invoice files

> Retrieves the information about all PDF files of a specified invoice. <br/>
> <br/>
> Invoice PDF files are returned in reverse chronological order by the value of the `versionNumber` field.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `invoice-id` - _required_ - The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.


### Get invoice items

> Retrieves the information about all items of a specified invoice.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `invoice-id` - _required_ - The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.


### Get taxation items of invoice item

> Retrieves information about the taxation items of a specific invoice item.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `page` - _optional_ - Page number.

* `invoice-id` - _required_ - The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.

* `item-id` - _required_ - The unique ID of an invoice item. For example, 2c86c8955bd63cc1015bd7c151af02ef.


### Update invoice

> Updates a specific invoice.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The ID of the invoice. For example,
2c92c8955bd63cc1015bd7c151af02ab.


### Get invoice application parts

> Note: The Invoice Settlement feature is in Limited Availability. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at Zuora Global Support.<br/>
> <br/>
> Retrieves information about the payments or credit memos that are applied to a specified invoice.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.


### Create credit memo from invoice

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates an ad-hoc credit memo from an invoice.<br/>
> <br/>
> You can create a credit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The ID of an invoice that you want to create a credit memo from.


### Create debit memo from invoice

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates an ad-hoc debit memo from an invoice.<br/>
> <br/>
> You can create a debit memo from an invoice only if you have the user permission. See [Billing Roles](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/A_Administrator_Settings/User_Roles/d_Billing_Roles) for more information.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The ID of an invoice that you want to create a debit memo from.


### Email invoice

> Sends a posted invoice to the specified email addresses manually.<br/>
> <br/>
> <br/>
> <br/>
> ## Notes<br/>
>   - You must activate the **Manual Email For Invoice | Manual Email For Invoice** notification before emailing invoices. To include the invoice PDF in the email, select the **Include Invoice PDF** check box in the **Edit notification** dialog from the Zuora UI. See [Create and Edit Notifications](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/C_Create_Notifications#section_2) for more information.<br/>
> <br/>
> <br/>
>   - Zuora sends the email messages based on the email template you set. You can set the email template to use in the **Delivery Options** panel of the **Edit notification** dialog from the Zuora UI. By default, the **Invoice Posted Default Email Template** template is used. See [Create and Edit Email Templates](https://knowledgecenter.zuora.com/CF_Users_and_Administrators/Notifications/Create_Email_Templates) for more information.<br/>
> <br/>
> <br/>
>   - The invoices are sent only to the work email addresses or personal email addresses of the Bill To contact if the following conditions are all met:<br/>
> <br/>
>     * The `useEmailTemplateSetting` field is set to `false`.<br/>
>     * The email addresses are not specified in the `emailAddresses` field.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.


### Reverse invoice

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Reverses a posted invoice. <br/>
> <br/>
> **Restrictions**<br/>
> <br/>
> You are not allowed to reverse an invoice if one of the following restrictions is met:<br/>
> <br/>
> * Payments and credit memos are applied to the invoice.<br/>
> * The invoice is split.<br/>
> * The invoice is not in Posted status.<br/>
> * The total amount of the invoice is less than 0 (a negative invoice).<br/>
> * Using Tax Connector for Extension Platform to calculate taxes.<br/>
> <br/>
> See [Reverse Posted Invoices](https://knowledgecenter.zuora.com/CB_Billing/IA_Invoices/Reverse_Posted_Invoices) for more information.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The ID of the invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.


### Write off invoice

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Writes off a posted invoice. <br/>
> <br/>
> By writing off an invoice, a credit memo is created and applied to the invoice. The generated credit memo items and credit memo taxation items are applied to invoice items and invoice taxation items based on the configured default application rule. If an invoice is written off, the balance of each invoice item and invoice taxation item must be zero.<br/>
> <br/>
> An invoice cannot be written off in the following situations:<br/>
>   - Any transactions such as payments or credit memos are applied to an invoice.<br/>
>   - The balance of an invoice has been changed.

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceId` - _required_ - The unique ID of an invoice. For example, 2c92c8955bd63cc1015bd7c151af02ab.


### Get breakdown of invoice by order

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> <br/>
> Retrieves a specified invoice that is broken down by orders. One invoice item might be broken down into a list of order related items.<br/>
> <br/>
> ### Phantom Invoice Item<br/>
> <br/>
> Phantom invoice items are generated via this API operation if an invoice item has a credit back scenario and the action you are making is prior to the end of a previous action.<br/>
> <br/>
> Phantom invoice items are not real invoice items and have no impact to billing. They are generated in parallel with the real invoice item and are used to properly allocate invoice items to the relevant orders. They share the same invoice item id with the real invoice item but with a prefix of "Phantom-". Also, the amount of a phantom invoice item is always zero.<br/>
> <br/>
> Below is an example phantom invoice item, which reflects in the period of 2017-10-01 to 2017-12-31:<br/>
> * Order 1 creates the initial subscription with an invoice breakdown amount of "3000".<br/>
> * Order 2 decreases the product quantity and so reduces the amount by "1500".<br/>
> * Order 3 cancels the subscription and so reduces the remaining amount by "1500".<br/>
> <br/>
> ```<br/>
> {<br/>
>   "invoiceItemId": "Phantom-2c98903063f6d7b1016416df98c721b6",<br/>
>   "subscriptionNumber": "55073a2fc6eb462aac0422aad7657f3c",<br/>
>   "chargeNumber": "d-000001",<br/>
>   "applyToChargeNumber": null,<br/>
>   "startDate": "2017-10-01",<br/>
>   "endDate": "2017-12-31",<br/>
>   "amount": 0,<br/>
>   "isCredit": true,<br/>
>   "breakdownDetails": [<br/>
>     {<br/>
>       "orderNumber": "980c4a4d414644339c113c7919a49fc2",<br/>
>       "amount": -1500,<br/>
>       "termNumber": 1,<br/>
>       "startDate": "2017-10-01",<br/>
>       "endDate": "2017-12-31",<br/>
>       "orderItemId": "2c98903063f6d7b1016416df8c512147",<br/>
>       "generatedReason": "Contraction",<br/>
>       "orderActionId": "2c98903063f6d7b1016416df9738219b"<br/>
>     },<br/>
>     {<br/>
>       "orderNumber": "e0a839e8b33d476b9a86ca50e71ccbb4",<br/>
>       "amount": -1500,<br/>
>       "termNumber": 1,<br/>
>       "startDate": "2017-10-01",<br/>
>       "endDate": "2017-12-31",<br/>
>       "orderItemId": "2c98903063f6d7b1016416df8c512147",<br/>
>       "generatedReason": "DecreaseQuantity",<br/>
>       "orderActionId": "2c98903063f6d7b1016416df92242167"<br/>
>     },<br/>
>     {<br/>
>       "orderNumber": "fd0e377b1bca4cc4805fc4cf1be72e05",<br/>
>       "amount": 3000,<br/>
>       "termNumber": 1,<br/>
>       "startDate": "2017-10-01",<br/>
>       "endDate": "2017-12-31",<br/>
>       "orderItemId": "2c98903063f6d7b1016416df8c512147",<br/>
>       "generatedReason": "Extension",<br/>
>       "orderActionId": "2c98903063f6d7b1016416df8bb12136"<br/>
>     }<br/>
>   ]<br/>
> }<br/>
> ```

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoiceNumber` - _required_ - Number of invoice to be broken down.

### Create summary journal entry

> This REST API reference describes how to manually create a summary journal entry. Request and response field descriptions and sample code are provided.<br/>
> ## Requirements<br/>
> 1.The sum of debits must equal the sum of credits in the summary journal entry.<br/>
> <br/>
> 2.The following applies only if you use foreign currency conversion:<br/>
>   * If you have configured Aggregate transactions with different currencies during a Journal Run to "Yes", the value of the **currency** field must be the same as your tenant's home currency. That is, you must create journal entries using your home currency.<br/>
>   * All journal entries in an accounting period must either all be aggregated or all be unaggregated. You cannot have a mix of aggregated and unaggregated journal entries in the same accounting period.

*Tags:* `Summary Journal Entries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get all summary journal entries in a journal run

> This REST API reference describes how to retrieve information about all summary journal entries in a journal run.

*Tags:* `Summary Journal Entries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `jr-number` - _required_ - Journal run number.

### Delete summary journal entry

> This reference describes how to delete a summary journal entry using the REST API.<br/>
> <br/>
> You must have the "Delete Cancelled Journal Entry" user permission enabled to delete summary journal entries.<br/>
> <br/>
> A summary journal entry must be canceled before it can be deleted.

*Tags:* `Summary Journal Entries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `je-number` - _required_ - Journal entry number in the format JE-00000001.

### Get summary journal entry

> This REST API reference describes how to get information about a summary journal entry by its journal entry number.

*Tags:* `Summary Journal Entries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `je-number` - _required_

### Update basic information of a summary journal entry

> This REST API reference describes how to update the basic information of a summary journal entry. Request and response field descriptions and sample code are provided.

*Tags:* `Summary Journal Entries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `je-number` - _required_ - Journal entry number in the format JE-00000001.

### Cancel summary journal entry

> This reference describes how to cancel a summary journal entry using the REST API.<br/>
> <br/>
> You must have the "Cancel Journal Entry" user permission enabled to cancel summary journal entries.<br/>
> <br/>
> A summary journal entry cannot be canceled if its Transferred to Accounting status is "Yes" or "Processing".

*Tags:* `Summary Journal Entries`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `je-number` - _required_ - Journal entry number in the format JE-00000001.

### Create journal run

> This REST API reference describes how to create a journal run. Request and response field descriptions and sample code are provided.

*Tags:* `Journal Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete journal run

> This reference describes how to delete a journal run using the REST API.<br/>
>                       <br/>
>  You can only delete journal runs that have already been canceled.<br/>
>                       <br/>
>  You must have the "Delete Cancelled Journal Run" Zuora Finance user permission enabled to delete journal runs.

*Tags:* `Journal Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `jr-number` - _required_ - Journal run number. Must be a valid journal run number in the format `JR-00000001`.


### Get journal run

> This REST API reference describes how to get information about a journal run. Request and response field descriptions and sample code are provided.

*Tags:* `Journal Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `jr-number` - _required_ - Journal run number. Must be a valid journal run number in the format `JR-00000001`.


### Cancel journal run

> This reference describes how to cancel a journal run using the REST API.<br/>
>           <br/>
> The summary journal entries in the journal run are canceled asynchronously. See the "Example" section below for details.<br/>
>           <br/>
> You must have the "Cancel Journal Run" Zuora Finance user permission enabled to cancel journal runs.<br/>
> <br/>
> ## Notes<br/>
> When you cancel a journal run, the summary journal entries associated with that journal run are canceled asynchronously. A response of `{ "success": true }` means only that the specified journal run has a status of "Pending", "Error", or "Completed" and therefore can be canceled, but does not mean that the whole journal run was successfully canceled.<br/>
> <br/>
> For example, let's say you want to cancel journal run JR-00000075. The journal run status is "Completed" and it contains ten journal entries. One of the journal entries has its Transferred to Accounting status set to "Yes", meaning that the entry cannot be canceled. The workflow might go as follows:<br/>
> 1. You make an API call to cancel the journal run.<br/>
> 2. The journal run status is "Completed", so you receive a response of `{ "success": true }`.<br/>
> 3. Zuora begins asynchronously canceling journal entries associated with the journal run. The journal entry whose Transferred to Accounting status is "Yes" fails to be canceled. The cancelation process continues, and the other journal entries are successfully canceled.<br/>
> 4. The journal run status remains as "Completed". The status does not change to "Canceled" because the journal run still contains a journey entry that is not canceled.

*Tags:* `Journal Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `jr-number` - _required_ - Journal run number. Must be a valid journal run number in the format JR-00000001. 
You can only cancel a journal run whose status is "Pending", "Error", or "Completed".


### Get callout notification histories

> This REST API reference describes how to get a notification history for callouts.

*Tags:* `Notifications`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `endTime` - _optional_ - The final date and time of records to be returned. Defaults to now. Use format yyyy-MM-ddTHH:mm:ss.
* `startTime` - _optional_ - The initial date and time of records to be returned. Defaults to (end time - 1 day). Use format yyyy-MM-ddTHH:mm:ss.
* `objectId` - _optional_ - The ID of an object that triggered a callout notification.
* `failedOnly` - _optional_ - If `true`, only return failed records. If `false`, return all records in the given date range. The default value is `true`.
* `eventCategory` - _optional_ - Category of records to be returned by event category.
* `includeResponseContent` - _optional_

### Get email notification histories

> This REST API reference describes how to get a notification history for notification emails.<br/>
> <br/>
> <br/>
> ## Notes<br/>
> Request parameters and their values may be appended with a "?" following the HTTPS GET request.  Additional request parameter are separated by "&". <br/>
> <br/>
> For example:<br/>
> <br/>
> `GET https://rest.zuora.com/v1/notification-history/email?startTime=2015-01-12T00:00:00&endTime=2015-01-15T00:00:00&failedOnly=false&eventCategory=1000&pageSize=1`

*Tags:* `Notifications`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `endTime` - _optional_ - The end date and time of records to be returned. Defaults to now. Use format yyyy-MM-ddTHH:mm:ss. The maximum date range (endTime - startTime) is three days.
* `startTime` - _optional_ - The initial date and time of records to be returned. Defaults to (end time - 1 day). Use format yyyy-MM-ddTHH:mm:ss. The maximum date range (endTime - startTime) is three days.
* `objectId` - _optional_ - The Id of an object that triggered an email notification.
* `failedOnly` - _optional_ - If `true`, only returns failed records. When `false`, returns all records in the given date range. Defaults to `true` when not specified.
* `eventCategory` - _optional_ - Category of records to be returned by event category.

### CRUD: Create account

> Creates an account without creating any associated objects such as subscriptions.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete account

> Deletes a specific account asynchronously.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get account

> Retrieves the information about one specific account.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update account

> Updates an account.

*Tags:* `Accounts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Delete amendment

> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> <br/>
> Invoiced amendments cannot usually be deleted. One exception to this rule is auto-renew amendments. You can delete the last auto-renew amendment even if an invoice has been generated.

*Tags:* `Amendments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get amendment

*Tags:* `Amendments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update amendment

> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Amendments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Create bill run

> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com). <br/>
> <br/>
> <br/>
> Creates an ad hoc bill run or a single account or multiple customer accounts.<br/>
> <br/>
> When creating a single account ad hoc bill run, your request must include `AccountId` and must not include `Batch` or `BillCycleDay`. <br/>
> <br/>
> If more than 500 bill runs created by using this operation are in Pending status, no more bill runs can be created by using this operation.

*Tags:* `Bill Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete bill run

> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com). <br/>
> <br/>
> <br/>
> When deleting a bill run, the logic is the same as when using the UI to delete a bill run. The only required parameter is `BillRunId`. The Status for the bill run must be `Canceled` in order to delete a bill run.

*Tags:* `Bill Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get bill run

> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com). <br/>
> <br/>
> <br/>
> Business operations depending on the completion of the bill run will not be available while the bill run query returns `PostInProgress`. Upon completion of the bill run, a query will return `Posted`.

*Tags:* `Bill Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Post or Cancel bill run

> **Note:** This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com). <br/>
> <br/>
> <br/>
> ## Post a Bill Run<br/>
> <br/>
> Posting a bill run is an asynchronous operation. To post a bill run, the current bill run must have a status of `Completed`.<br/>
> <br/>
> When a bill run is posted, its status is changed to `PostInProgress`. Once all invoices for this bill run are posted then its status is changed to `Posted`.   <br/>
> <br/>
> When you post a bill run and query the status of a bill run, you will get one of the following results `PostInProgress`, `Completed`, or `Posted`. If all invoices in the bill run are posted, then the status of the bill run is `Posted`. If one or more invoices fail to post, the status will change back to `Completed` and you will need to post the bill run again.<br/>
> <br/>
> ## Cancel a Bill Run<br/>
> <br/>
> Canceling a bill run is an asynchronous operation. When canceling a bill run, the logic is the same as when using the UI to cancel a bill run. You need to provide the `BillRunId`, and set the Status to `Canceled`. <br/>
> <br/>
> When canceling a bill run, consider the following:<br/>
> <br/>
> * Canceling a bill run with a `Completed` status.<br/>
>   * Only the current bill run will be canceled.<br/>
> * Canceling a bill run with a `Pending` status.<br/>
>   * When canceling an Ad-hoc bill run, only the current bill run will be canceled.<br/>
>   * When canceling a scheduled bill, all scheduled bill runs will be canceled.<br/>
> <br/>
> The Cancel operation may not be successful. Its success depends on its current business validation. Only a bill run that has no posted invoices can be canceled. If any posted invoices belong to the bill run then an invalid value exception will be thrown with the message, "The Bill Run cannot be Cancelled, There are Posted invoices."

*Tags:* `Bill Run`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve CommunicationProfile

*Tags:* `Communication Profiles`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create Contact

*Tags:* `Contacts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete Contact

*Tags:* `Contacts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve Contact

*Tags:* `Contacts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update Contact

*Tags:* `Contacts`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve CreditBalanceAdjustment

*Tags:* `Credit Balance Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create Export

> Use this operation to create a data source export. After you have created a data source export, use [CRUD: Retrieve Export](https://www.zuora.com/developer/api-reference/#operation/Object_GETExport) to check the status of the data source export and access the exported data.<br/>
> <br/>
> When you export data from Zuora, each exported file is available for download for 7 days. Data source exports (Export objects) older than 90 days are automatically deleted.<br/>
> <br/>
> **Note:** This operation supports the [Export ZOQL](https://knowledgecenter.zuora.com/DC_Developers/M_Export_ZOQL) query language. However, this operation does not support some data sources, objects, and fields in Export ZOQL queries. For full compatibility with Export ZOQL, Zuora recommends that you use the [AQuA API](https://knowledgecenter.zuora.com/DC_Developers/T_Aggregate_Query_API) instead of this operation.

*Tags:* `Exports`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Retrieve Export

> Use this operation to check the status of a data source export and access the exported data.<br/>
> <br/>
> When you export data from Zuora, each exported file is available for download for 7 days. Data source exports (Export objects) older than 90 days are automatically deleted.

*Tags:* `Exports`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Delete Feature

*Tags:* `Features`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve Feature

*Tags:* `Features`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create Import

> Creates a data import.

*Tags:* `Imports`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Retrieve Import

*Tags:* `Imports`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create InvoiceAdjustment

*Tags:* `Invoice Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete InvoiceAdjustment

*Tags:* `Invoice Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve InvoiceAdjustment

*Tags:* `Invoice Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update InvoiceAdjustment

*Tags:* `Invoice Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Delete InvoiceItemAdjustment

*Tags:* `Invoice Item Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve InvoiceItemAdjustment

*Tags:* `Invoice Item Adjustments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Retrieve InvoiceItem

*Tags:* `Invoice Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create InvoicePayment

*Tags:* `Invoice Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Retrieve InvoicePayment

*Tags:* `Invoice Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update InvoicePayment

*Tags:* `Invoice Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve InvoiceSplitItem

*Tags:* `Invoice Split Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Retrieve InvoiceSplit

*Tags:* `Invoice Splits`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Delete Invoice

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve Invoice

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update Invoice

*Tags:* `Invoices`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Create payment

> Creates a payment.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Create payment method

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete payment method snapshot

> This REST API reference describes how to delete a Payment Method Snapshot.

*Tags:* `Payment Method Snapshots`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get payment method snapshot

> This REST API reference describes how to retrieve a Payment Method Snapshot.<br/>
> <br/>
> A Payment Method Snapshot is a copy of the particular Payment Method used in a transaction. If the Payment Method is deleted, the Payment Method Snapshot continues to retain the data used in each of the past transactions.<br/>
> <br/>
> ## Notes<br/>
> The following Payment Method fields are not available in Payment Method Snapshots:<br/>
> <br/>
> * `Active`<br/>
> * `AchAddress1`<br/>
> * `AchAddress2`<br/>
> * `CreatedById`<br/>
> * `CreatedDate`<br/>
> * `UpdatedById`<br/>
> * `UpdatedDate`<br/>
> <br/>
> The Payment Method Snapshot field `PaymentMethodId` is not available in Payment Methods.

*Tags:* `Payment Method Snapshots`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Retrieve PaymentMethodTransactionLog

*Tags:* `Payment Method Transaction Logs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Delete payment method

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get payment method

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update payment method

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get payment transaction log

> Retrieves information about a specific payment transaction log.

*Tags:* `Payment Transaction Logs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - The ID of a payment transaction log.


### CRUD: Delete payment

> Deletes a payment. Only payments with the Cancelled status can be deleted.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - The unique ID of the payment to be deleted. For example, 2c92c0f85d4e95ae015d4f7e5d690622.


### CRUD: Get payment

> Retrieves the information about one specific payment.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352.


### CRUD: Update payment

> Updates a payment.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - The unique ID of a payment. For example, 2c92c095592623ea01596621ada84352.


### CRUD: Create Product

*Tags:* `Products`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete ProductFeature

*Tags:* `Product Features`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve ProductFeature

*Tags:* `Product Features`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create ProductRatePlan

*Tags:* `Product Rate Plans`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Create product rate plan charge

> Creates a product rate plan charge for a specified rate plan charge. <br/>
> <br/>
> Product rate plan charges can be of three types, one-time fees, recurring fees, and usage fees.

*Tags:* `Product Rate Plan Charges`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Retrieve ProductRatePlanChargeTier

*Tags:* `Product Rate Plan Charge Tiers`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Delete product rate plan charge

> Deletes a product rate plan charge.

*Tags:* `Product Rate Plan Charges`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - The unique ID of the product rate plan charge to be deleted. For example, 2c93808457d787030157e031fcd34e19.


### CRUD: Get product rate plan charge

*Tags:* `Product Rate Plan Charges`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - The unique ID of a product rate plan charge to be retrieved. For example, 2c93808457d787030157e031fcd34e19.


### CRUD: Update product rate plan charge

> Updates the information about a product rate plan charge.

*Tags:* `Product Rate Plan Charges`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - The unique ID of the product rate plan charge to be updated. For example, 2c93808457d787030157e031fcd34e19.


### CRUD: Delete ProductRatePlan

*Tags:* `Product Rate Plans`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve ProductRatePlan

*Tags:* `Product Rate Plans`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update ProductRatePlan

*Tags:* `Product Rate Plans`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Delete Product

*Tags:* `Products`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve Product

*Tags:* `Products`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update Product

*Tags:* `Products`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve RatePlanChargeTier

*Tags:* `Rate Plan Charge Tiers`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Retrieve RatePlanCharge

*Tags:* `Rate Plan Charges`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Retrieve RatePlan

*Tags:* `Rate Plans`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Create refund

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Retrieve RefundInvoicePayment

*Tags:* `Refund Invoice Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Retrieve RefundTransactionLog

*Tags:* `Refund Transaction Logs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Delete refund

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Get refund

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update refund

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve SubscriptionProductFeature

*Tags:* `Subscription Product Features`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Delete Subscription

> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve Subscription

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update Subscription

> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Create TaxationItem

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete TaxationItem

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve TaxationItem

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update TaxationItem

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Create UnitOfMeasure

*Tags:* `Unit Of Measure`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete UnitOfMeasure

*Tags:* `Unit Of Measure`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve UnitOfMeasure

*Tags:* `Unit Of Measure`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update UnitOfMeasure

*Tags:* `Unit Of Measure`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Create Usage

*Tags:* `Usage`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).


### CRUD: Delete Usage

*Tags:* `Usage`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### CRUD: Retrieve Usage

*Tags:* `Usage`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `fields` - _optional_ - Object fields to return
* `id` - _required_ - Object id

### CRUD: Update Usage

*Tags:* `Usage`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `Zuora-Track-Id` - _optional_ - A custom identifier for tracing the API call. If you set a value for this header, Zuora returns the same value in the response headers. This header enables you to associate your system process identifiers with Zuora API calls, to assist with troubleshooting in the event of an issue.

The value of this field must use the US-ASCII character set and must not include any of the following characters: colon (`:`), semicolon (`;`), double quote (`"`), and quote (`'`).

* `id` - _required_ - Object id

### Create billing preview

> **Note:** The Billing Preview feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> <br/>
> Generates a preview of future invoice items for one customer account. Use the BillingPreview call to calculate how much a single customer will be invoiced from the most recent invoice to a specific end of term date in the future.<br/>
> <br/>
> Additionally, you can use the BillingPreview service to access real-time data on an individual customer's usage consumption. <br/>
> <br/>
> The BillingPreview call does not calculate taxes for charges in the subscription.<br/>
> <br/>
> If you have the Invoice Settlement feature enabled, you can also generate a preview of future credit memo items for one customer account. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).

*Tags:* `Operations`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Invoice and collect

> Generates and posts invoices and credit memos and collects payments for posted invoices. Credit memos are only available if you have the Invoice Settlement feature enabled and negative charges exist. Credit memos will not be applied to invoices. If draft invoices and credit memos exist when you run this operation, this operation will post the invoices and credit memos. Note that draft credit memos created from an invoice or a product rate plan charge will not be posted.<br/>
> <br/>
> You can use this operation to generate invoices and collect payments on the posted invoices,<br/>
>  or else simply collect payment on a specified existing<br/>
> invoice. The customer's default payment method is used, and the full<br/>
> amount due is collected. The operation depends on the parameters you<br/>
> specify.<br/>
> <br/>
> - To generate one or more new invoices for that customer and collect<br/>
> payment on the generated and other unpaid invoice(s), leave the **invoiceId** field empty. <br/>
> <br/>
> - To collect payment on an existing invoice, specify the invoice ID. <br/>
> <br/>
> <br/>
> The operation is atomic; if any part is unsuccessful, the entire<br/>
> operation is rolled back.<br/>
> <br/>
> When an error occurs, gateway reason codes and error messages are returned the error response of this operation. The following items are some gateway response code examples.<br/>
> <br/>
> - Orbital: `05 Do Not Honor`; `14 Invalid Credit Card Number`<br/>
> - Vantiv: `301 Invalid Account Number`; `304 Lost/Stolen Card`  <br/>
> - CyberSource2: `202 Expired card`; `231 Invalid account number`<br/>
> <br/>
> For more reason code information, see the corresponding payment gateway documentation. <br/>
> <br/>
> <br/>
> ## Notes<br/>
> <br/>
> Timeouts may occur when using this method on an account that<br/>
> has an extremely high number of subscriptions.

*Tags:* `Operations`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. 

You need to set this parameter if you use the following fields:
* documentDate
* targetDate            

If you have the Invoice Settlement feature enabled, you need to specify this parameter. Otherwise, an error is returned.


See [Zuora REST API Versions](https://www.zuora.com/developer/api-reference/#section/API-Versions) for more information.


### Get all orders

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> <br/>
> Retrieves information about all orders in your tenant. By default, it returns the first page of the orders.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `page` - _optional_ - The page number of the orders retrieved. 

* `pageSize` - _optional_ - Number of rows returned per page.

* `dateFilterOption` - _optional_ - The date type to filter on. This field value can be orderDate or updatedDate. Default is orderDate.

* `startDate` - _optional_ - The result will only contain the orders with the date of dateFilterOption later than or equal to this date.

* `endDate` - _optional_ - The result will only contains orders with the date of dateFilterOption earlier than or equal to this date.


### Create order

> **Note:** This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. The migration to Orders is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. <br/>
> <br/>
> You can use this operation to create subscriptions and make changes to subscriptions by creating orders. The following tutorials demonstrate how to use this operation:<br/>
> <br/>
>  * [Add a Product to a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/A_Add_a_Product_to_a_Subscription)<br/>
>  * [Create a Ramp Deal](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/A_Create_a_Ramp_Deal)<br/>
>  * [Create a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/A_Create_a_Subscription)<br/>
>  * [Change the Owner of a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/C_Change_the_Owner_of_a_Subscription)<br/>
>  * [Change the Terms and Conditions of a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/C_Change_the_Terms_and_Conditions_of_a_Subscription)<br/>
>  * [Renew a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/C_Renew_a_Subscription)<br/>
>  * [Renew a Subscription and Upgrade a Product](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/C_Renew_a_Subscription_and_Upgrade_a_Product)<br/>
>  * [Replace a Product in a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/C_Replace_a_Product_in_a_Subscription)<br/>
>  * [Update a Product in a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/C_Update_a_Product_in_a_Subscription)<br/>
>  * [Cancel a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/D_Cancel_a_Subscription)<br/>
>  * [Remove a Product from a Subscription](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AC_Orders_Tutorials/D_Remove_a_Product_from_a_Subscription)<br/>
> <br/>
> To return the IDs associated with the numbers returned in the Create Order operation, use `?returnIds=true` at the end of the operation's endpoint.<br/>
> <br/>
> Creating a draft order is currently not supported. See [Known Limitations in Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/C_Known_Limitations_in_Orders) for additional limitations.<br/>
> <br/>
> **Note:** When you are to suspend a subcription (via the `suspend` order action), if in the same "Create order" call you are to perform other subsequent order actions on the supscription to suspend, you must first resume the subscription (via a `resume` order action). <br/>
> <br/>
> **Note:** When using this operation to create an account, create a subscription, run billing, and collect payment in a single call, if the payment processing fails then all the other steps will be rolled back. This means that the invoice will not be generated, the subscription will not be created, and the account will not be created.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. 

You need to set this parameter if you use the following fields:
* subscriptions
* subscriptionNumbers


### Get orders by invoice owner

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the detailed information about all orders for a specified invoice owner.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `accountNumber` - _required_ - The invoice owner account number.
* `page` - _optional_ - The page number of the orders retrieved. The default is 1.

* `pageSize` - _optional_ - Number of rows returned per page.

* `dateFilterOption` - _optional_ - The date type to filter on. This field value can be orderDate or updatedDate. Default is orderDate.

* `startDate` - _optional_ - The result will only contain the orders with the date of dateFilterOption later than or equal to this date.

* `endDate` - _optional_ - The result will only contain the orders with the date of dateFilterOption earlier than or equal to this date.


### Preview order

> **Note:** This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. The migration to Orders is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. <br/>
> <br/>
> <br/>
> Retrieves the preview of the charge metrics and invoice items of a specified order. This operation is only an order preview and no order is created.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get orders by subscription number

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the detailed information about all orders for a specified subscription. Any orders containing the changes on the specified subscription are returned.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `subscriptionNumber` - _required_ - The subscription number.
* `page` - _optional_ - The page number of the orders retrieved. The default is '1'.

* `pageSize` - _optional_ - Number of rows returned per page.

* `dateFilterOption` - _optional_ - The date type to filter on. This field value can be 'orderDate' or 'updatedDate'. Default is orderDate.

* `startDate` - _optional_ - The result will only contain the orders with the date of 'dateFilterOption' later than or equal to this date.

* `endDate` - _optional_ - The result will only contain the orders with the date of 'dateFilterOption' earlier than or equal to this date.


### Get orders by subscription owner

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the detailed information about all orders for a specified subscription owner. Any orders containing the changes on the subscriptions owned by this account are returned.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `accountNumber` - _required_ - The subscription owner account number.
* `page` - _optional_ - The page number of the orders retrieved. The default is 1.

* `pageSize` - _optional_ - Number of rows returned per page.

* `dateFilterOption` - _optional_ - The date type to filter on.
This field value can be 'orderDate' or 'updatedDate'. Default is orderDate.

* `startDate` - _optional_ - The result will only contain the orders with the date of 'dateFilterOption' later than or equal to this date.

* `endDate` - _optional_ - The result will only contain the orders with the date of 'dateFilterOption' earlier than or equal to this date.


### Get term information for subscription

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the terms of the specified subscription.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `subscriptionNumber` - _required_ - The number of the subscription to retrieve terms for. For example, A-S00000001.

* `version` - _optional_ - The version of the subscription to retrieve terms for. If you do not specify this parameter, Zuora returns the terms for the latest version of the subscription.

* `page` - _optional_ - The page number of the terms retrieved.

* `pageSize` - _optional_ - Number of rows returned per page.


### Delete order

> **Note:** This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. The migration to Orders is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. <br/>
> <br/>
> <br/>
> Deletes a specified order. All the subscriptions changed by this order are deleted. After the deletion, the subscriptions are rolled back to the previous version. <br/>
> <br/>
> You are not allowed to delete an order if the charges that are affected by this order are invoiced.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - The number of the order to be deleted.

### Get an order

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> <br/>
> Retrieves the detailed information about a specified order.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - The order number to be retrieved.

### Get billing information for order

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the billing information about a specified order. The information includes the billed and unbilled amount of the order.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - The order number.
* `asOfDate` - _optional_ - Billing states of the order will be calculated as of this date. Invoices with the invoice date later than this date will not be counted into the billed amount. The default value is today.

### Update order custom fields

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled. <br/>
> <br/>
> Updates the custom fields of a specified order.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - The order number.

### Get order metrics for evergreen subscription

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> <br/>
> Retrieves the metrics of an evergreen subscription in a specified order.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - The order number.

* `subscriptionNumber` - _required_ - The subscription number you want to get the metrics for.

* `startDate` - _required_ - The start date of the date range for which you want to get the metrics. The date must be in yyyy-mm-dd format. For example, 2017-12-03.

* `endDate` - _required_ - The end date of the date range for which you want to get the metrics. The date must be in yyyy-mm-dd format. For example, 2017-12-03.


### Get rated result for order

> **Note:** This feature is only available if you have the [Order Metrics](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Order_Metrics) feature enabled. The migration to Order Metrics is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available. If you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders) feature enabled, you already have the Order Metrics feature enabled.<br/>
> <br/>
> Retrieves the rated results of all the subscriptions in the specified order.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - The order number.

### Update order action trigger dates

> **Note:**  This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. The migration to Orders is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available.<br/>
> <br/>
> Updates a `CreateSubscription` order action's triggering dates.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `orderNumber` - _required_ - Order number of a pending order in which you are to update a `CreateSubscription` order action's triggering dates.

### Create payment method

> You can use this operation to create a payment method for a customer account. This operation supports the payment methods listed below.<br/>
> <br/>
> ### PayPal Express Checkout<br/>
> The following request body fields are specific to this payment method:<br/>
> * `BAID` (required)<br/>
> * `email` (required)<br/>
> <br/>
> ### PayPal Native Express Checkout<br/>
> The following request body fields are specific to this payment method:<br/>
> * `BAID` (required)<br/>
> * `email` (optional)<br/>
> <br/>
> ### PayPal Adaptive<br/>
> The following request body fields are specific to this payment method:<br/>
> * `preapprovalKey` (required)<br/>
> * `email` (required)

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Create credit card payment method

> This REST API reference describes how to create a new credit card payment method for a customer account.<br/>
> <br/>
> This API call is CORS Enabled. Use client-side JavaScript to invoke the call. <br/>
> <br/>
> **Note**: If you use this operation to create credit card payment methods instead of using the [iFrame of Hosted Payment Pages](https://knowledgecenter.zuora.com/CB_Billing/LA_Hosted_Payment_Pages/C_Hosted_Payment_Pages/B_Implementing_Hosted_Payment_Pages_on_Your_Website/C_Embed_and_Submit_the_iFrame), you are subject to PCI-compliance audit requirements.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get credit card payment methods for account

> This REST API reference describes how to retrieve all credit card<br/>
> information for the specified customer account. <br/>
> <br/>
> ## Notes<br/>
> The response includes details credit or debit cards for the specified customer account. Card numbers are masked, e.g., "************1234". Cards are returned in reverse chronological order of last update.<br/>
> <br/>
> You can send requests for bank transfer payment methods types. The response will not include bank transfer details.<br/>
> <br/>
> The response only includes payment details on payment methods that are credit or debit cards.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `account-key` - _required_ - Account number or account ID.

### Update credit card payment method

> Updates an existing credit card payment method for the specified<br/>
> customer account.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - Unique ID of the payment method to update.

### Create Apple Pay payment method

> The decryption API endpoint can conditionally perform 3 tasks in one atomic call:<br/>
>   * Decrypt Apple Pay Payment token<br/>
>   * Create Credit Card Payment Method in Zuora with decrypted Apple Pay information<br/>
>   * Process Payment on a specified Invoice (optional)

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete payment method

> Deletes a credit card payment method from the specified customer<br/>
> account.<br/>
> <br/>
> If the specified payment method is the account's default payment<br/>
> method, the request will fail.  In that case, you must first designate a<br/>
> different payment method for that customer to be the default.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - Unique identifier of a payment method. (Since this ID is unique, and linked to a customer account in the system, no customer identifier is needed.)

### Create authorization

> **Note:** If you wish to enable this feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Enables you to authorize the availability of funds for a transaction but delay the capture of funds until a later time. The payment gateways that support this operation include Verifi, CyberSource 1.28, and CyberSource 1.97.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - The unique ID of the payment method where the authorization is created.


### Get stored credential profiles

> Retrieves the stored credential profiles within a payment method.<br/>
> <br/>
> **Note:** This feature is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - ID of a payment method.

* `includeAll` - _optional_ - Specifies whether to retrieve all the stored credential profiles within the payment method.

By default, Zuora returns only the stored credential profiles with `Agreed` or `Active` status. If you set this parameter to `true`, Zuora returns all the stored credential profiles.


### Create stored credential profile

> Creates a stored credential profile within a pyament method.<br/>
> <br/>
> The stored credential profile represents a consent agreement that you have established with a customer. When you use the payment method in a transaction, Zuora may include information from the stored credential profile to inform the payment processor that the transaction is related to your pre-existing consent agreement with the customer.<br/>
> <br/>
> **Note:** This feature is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - ID of a payment method.


### Cancel stored credential profile

> Cancels a stored credential profile within a pyament method.<br/>
> <br/>
> Cancelling the stored credential profile indicates that the stored credentials are no longer valid, per a customer request. You cannot reactivate the stored credential profile after you have cancelled it.<br/>
> <br/>
> **Note:** This feature is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - ID of a payment method.

* `profile-number` - _required_ - Number that identifies a stored credential profile within the payment method.


### Expire stored credential profile

> Expires a stored credential profile within a pyament method.<br/>
> <br/>
> Expiring the stored credential profile indicates that the stored credentials are no longer valid, per an expiration policy in the stored credential transaction framework. You cannot reactivate the stored credential profile after you have expired it.<br/>
> <br/>
> **Note:** This feature is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - ID of a payment method.

* `profile-number` - _required_ - Number that identifies a stored credential profile within the payment method.


### Scrub payment method

> This operation enables you to replace all sensitive data in a payment method, related payment method snapshot table, and four related log tables with dummy values that will be stored in Zuora databases. <br/>
> <br/>
> This operation will scrub the sensitive data and soft-delete the specified payment method at the same time. <br/>
> <br/>
> **Note:** In order to use this operation, you must ensure that the **Scrub Sensitive Data of Specific Payment Method payments** permission is enabled in your user role. Contact your tenant administrator if you want to enable this permission. See [Scrub Payment Methods](https://knowledgecenter.zuora.com/CB_Billing/L_Payment_Methods/Scrub_Payment_Methods) for more information.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - The ID of the payment method where you want to scrub the sensitive data.


### Verify payment method

> Sends an authorization request to the corresponding payment gateway to verify the payment method, even though no changes are made for the payment method. Supported payment methods are Credit Cards and Paypal.<br/>
> <br/>
> Zuora now supports performing a standalone zero dollar verification or one dollar authorization for credit cards. It also supports a billing agreement status check on PayPal payment methods.<br/>
> <br/>
> If a payment method is created by Hosted Payment Pages and is not assigned to any billing account, the payment method cannot be verified through this operation.

*Tags:* `Payment Methods`

#### Input Parameters
* `payment-method-id` - _required_ - The ID of the payment method to be verified.


### Cancel authorization

> **Note:** If you wish to enable this feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Allows you to cancel an authorization. The payment gateways that support this operation include Verifi, CyberSource 1.28, and CyberSource 1.97.

*Tags:* `Payment Methods`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `payment-method-id` - _required_ - The unique ID of the payment method where the authorization is cancelled.


### Get payment runs

> Retrieves the information about all payment runs. You can define filterable fields to restrict the data returned in the response.<br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`. <br/>
> <br/>
> Examples:<br/>
> <br/>
> - /v1/payment-runs?status=Processed<br/>
> <br/>
> - /v1/payment-runs?targetDate=2017-10-10&status=Pending<br/>
> <br/>
> - /v1/payment-runs?status=Completed&sort=+updatedDate

*Tags:* `Payment Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field.

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field.

* `status` - _optional_ - This parameter filters the response based on the `status` field.

    Possible values: Pending, Processing, Completed, Error, Canceled.
* `targetDate` - _optional_ - This parameter filters the response based on the `targetDate` field.

* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field.

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by payment run number.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - targetDate
  - status
  - createdDate
  - createdById
  - updatedDate
  - updatedById

Examples:

- /v1/payment-runs?sort=+createdDate

- /v1/payment-runs?status=Processing&sort=-createdById,+targetDate


### Create payment run

> Creates a payment run. You can create a payment run to be executed immediately after it is created, or a scheduced payment run to be executed in future.<br/>
> <br/>
> The `accountId`, `batch`, `billCycleDay`, `currency`, `paymentGatewayId`, and `billingRunId` fields are used to determine which receivables to be paid in the payment run. If none of these fields is specified in the request body, the corresponding payment run collects payments for all accounts.

*Tags:* `Payment Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete payment run

> Deletes a payment run. Only payment runs with the Canceled or Error status can be deleted.

*Tags:* `Payment Runs`

#### Input Parameters
* `paymentRunId` - _required_ - The unique ID of a payment run. For example, 402890245f097f39015f0f074a2e0566.


### Get payment run

> Retrives the information about a specific payment run.

*Tags:* `Payment Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentRunId` - _required_ - The unique ID of a payment run. For example, 402890245f097f39015f0f074a2e0566.


### Update payment run

> Updates the information about an unexecuted payment run. Only pending payment runs can be updated.<br/>
> <br/>
> If none of the **accountId**, **batch**, **billCycleDay**, **currency**, **paymentGatewayId**, and **billingRunId** fields is specified in the request body, the corresponding payment run collects payments for all accounts.

*Tags:* `Payment Runs`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentRunId` - _required_ - The unique ID of a payment run. For example, 402890245f097f39015f0f074a2e0566.


### Get payment run summary

> Retrives the summary of a payment run.

*Tags:* `Payment Runs`

#### Input Parameters
* `paymentRunId` - _required_ - The unique ID of a payment run. For example, 402890245f097f39015f0f074a2e0566.


### Get payment gateways

> Retrieves the basic information about all the payment gateways.

*Tags:* `Payment Gateways`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get all payments

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all payments from all your customer accounts.<br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.<br/>
> <br/>
> Examples:<br/>
> <br/>
> - /v1/payments?status=Processed<br/>
> <br/>
> - /v1/payments?currency=USD&status=Processed<br/>
> <br/>
> - /v1/payments?status=Processed&type=External&sort=+number

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `accountId` - _optional_ - This parameter filters the response based on the `accountId` field.

* `amount` - _optional_ - This parameter filters the response based on the `amount` field.

* `appliedAmount` - _optional_ - This parameter filters the response based on the `appliedAmount` field.

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field.

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field.

* `creditBalanceAmount` - _optional_ - This parameter filters the response based on the `creditBalanceAmount` field.

* `currency` - _optional_ - This parameter filters the response based on the `currency` field.

* `effectiveDate` - _optional_ - This parameter filters the response based on the `effectiveDate` field.

* `number` - _optional_ - This parameter filters the response based on the `number` field.

* `refundAmount` - _optional_ - This parameter filters the response based on the `refundAmount` field.

* `status` - _optional_ - This parameter filters the response based on the `status` field.

    Possible values: Draft, Processing, Processed, Error, Canceled, Posted.
* `type` - _optional_ - This parameter filters the response based on the `type` field.

    Possible values: External, Electronic.
* `unappliedAmount` - _optional_ - This parameter filters the response based on the `unappliedAmount` field.

* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field.

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by payment number.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - number
  - accountId
  - amount
  - appliedAmount
  - unappliedAmount
  - refundAmount
  - creditBalanceAmount
  - effectiveDate
  - createdDate
  - createdById
  - updatedDate
  - updatedById
  
Examples:

- /v1/payments?sort=+number

- /v1/payments?status=Processed&sort=-number,+amount


### Create payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Creates a payment for the following scenarios:<br/>
> <br/>
> - A full payment on an invoice or debit memo<br/>
> - A partial payment<br/>
> - A payment for several invoices and debit memos<br/>
> - An unapplied payment <br/>
> <br/>
> If you do not know to which customer account the payment belongs, you can create a payment without specifying a customer account.<br/>
> <br/>
> When creating a payment, the total number of invoices and debit memos that the payment will apply to should be less than or equal to 1,000.<br/>
> <br/>
> If the Proration application rule is used, when creating a payment, the following quantity must be less than or equal to 10,000: <br/>
> <br/>
> (number of invoice items + number of debit memo items) * number of payment items<br/>
> <br/>
> Otherwise, the First In First Out rule will be used instead of the Proration rule.<br/>
> <br/>
> For more information, see [Create Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments) and [Create Payments Without Specifying Customer Accounts](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/AA_Create_Payments_Without_Specifying_Customer_Accounts).

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Delete payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Deletes a payment. Only payments with the Cancelled status can be deleted. <br/>
> <br/>
> If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be deleted.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Get payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about one specific payment.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Update payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Updates a payment.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Apply payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Applies an unapplied payment to invoices and debit memos.<br/>
> <br/>
> When applying a payment, the total number of invoices and debit memos that the payment will apply to must be less than or equal to 1,000.<br/>
> <br/>
> If the Proration application rule is used, when applying a payment, the following quantity must be less than or equal to 10,000: <br/>
> <br/>
> (number of invoice items + number of debit memo items) * number of payment items<br/>
> <br/>
> Otherwise, the First In First Out rule will be used instead of the Proration rule.<br/>
> <br/>
> <br/>
> For more information, see [Apply Unapplied Payments to Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Apply_Unapplied_Payments_to_Invoices_and_Debit_Memos).

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Cancel payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Cancels a payment. <br/>
> <br/>
> If you have the Invoice Settlement feature enabled, overpayments applied to credit balance cannot be cancelled.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Get payment parts

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all parts of a payment. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos. You can use this operation to get all the applied and unapplied portions of a payment.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `paymentId` - _required_ - The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Get payment part

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about a specific payment part. A payment can consist of an unapplied part, and several parts applied to invoices and debit memos.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `partid` - _required_ - The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts).

* `paymentId` - _required_ - The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Get payment part items

> **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all items of a payment part. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `partid` - _required_ - The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts).

* `paymentId` - _required_ - The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Get payment part item

> **Note:** The Invoice Item Settlement feature is in **Limited Availability**, and it must be used together with other Invoice Settlement features (Unapplied Payments, and Credit and Debit memos). If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the information about a specific payment part item. A payment part item is a single line item in a payment part. A payment part can consist of several different types of items.

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `partid` - _required_ - The unique ID of a specific payment part. You can get the payment part ID from the response of [Get payment parts](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentParts).

* `itempartid` - _required_ - The unique ID of a specific payment part item. You can get the payment part item ID from the response of [Get payment part items](https://www.zuora.com/developer/api-reference/#operation/GET_PaymentItemParts).

* `paymentId` - _required_ - The unique ID of a payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Refund payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Refunds a full or partial unapplied payment to your customers. To refund applied payments, you must unapply the applied payments from the invoices or debit memos, and then refund the unapplied payments to customers.<br/>
> <br/>
> For more information, see [Refund Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Z_Refund_Payments).

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Transfer payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Transfers an unapplied payment.<br/>
> <br/>
> For more information, see [Transfer Unapplied Payments](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Transfer_Unapplied_Payments).

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an unapplied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Unapply payment

> **Note:** The Invoice Settlement feature is in **Limited Availability**. This feature includes Unapplied Payments, Credit and Debit Memo, and Invoice Item Settlement. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Unapplies an applied payment from invoices and debit memos.<br/>
> <br/>
> For more information, see [Unapply Payments from Invoices and Debit Memos](https://knowledgecenter.zuora.com/CB_Billing/Invoice_Settlement/A_Unapplied_Payments/Management_of_Unapplied_Payments/Unapply_Payments_from_Invoices_and_Debit_Memos).

*Tags:* `Payments`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `paymentId` - _required_ - The unique ID of an applied payment. For example, 8a8082e65b27f6c3015b89e4344c16b1.


### Generate quotes document

> The `document` call generates a quote document and returns the generated document URL. You can directly access the generated quote file through the returned URL.<br/>
> <br/>
> The `document` call should be only used from Zuora Quotes. <br/>
> <br/>
> ## File Size Limitation <br/>
> The maximum export file size is 2047MB. If you have large data requests that go over this limit, you will get the following 403 HTTP response code from Zuora:<br/>
> `security:max-object-size>2047MB</security:max-object-size>`<br/>
> <br/>
> Submit a request at [Zuora Global Support](http://support.zuora.com/) if you require additional assistance.<br/>
> <br/>
> We can work with you to determine if large file optimization is an option for you.

*Tags:* `Quotes Document`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get product rate plans

> Retrieves information about all product rate plans of a specific product.

*Tags:* `Product Rate Plans`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `product_id` - _required_ - The unique ID of a product. For example, 2c92c0f96487e16a016487f663c71a61.


### Get all refunds

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all refunds. Two types of refunds are available, electronic refunds and external refunds.<br/>
> <br/>
> ### Filtering<br/>
> <br/>
> You can use query parameters to restrict the data returned in the response. Each query parameter corresponds to one field in the response body.<br/>
> <br/>
> If the value of a filterable field is string, you can set the corresponding query parameter to `null` when filtering. Then, you can get the response data with this field value being `null`.<br/>
> <br/>
> Examples:<br/>
> <br/>
> - /v1/refunds?status=Processed<br/>
> <br/>
> - /v1/refunds?amount=4&status=Processed<br/>
> <br/>
> - /v1/refunds?status=Processed&type=External&sort=+number

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `accountId` - _optional_ - This parameter filters the response based on the `accountId` field.

* `amount` - _optional_ - This parameter filters the response based on the `amount` field.

* `createdById` - _optional_ - This parameter filters the response based on the `createdById` field.

* `createdDate` - _optional_ - This parameter filters the response based on the `createdDate` field.

* `methodType` - _optional_ - This parameter filters the response based on the `methodType` field.

    Possible values: ACH, Cash, Check, CreditCard, PayPal, WireTransfer, DebitCard, CreditCardReferenceTransaction, BankTransfer, Other.
* `number` - _optional_ - This parameter filters the response based on the `number` field.

* `paymentId` - _optional_ - This parameter filters the response based on the `paymentId` field.

* `refundDate` - _optional_ - This parameter filters the response based on the `refundDate` field.

* `status` - _optional_ - This parameter filters the response based on the `status` field.

    Possible values: Processed, Canceled, Error, Processing.
* `type` - _optional_ - This parameter filters the response based on the `type` field.

    Possible values: External, Electronic.
* `updatedById` - _optional_ - This parameter filters the response based on the `updatedById` field.

* `updatedDate` - _optional_ - This parameter filters the response based on the `updatedDate` field.

* `sort` - _optional_ - This parameter restricts the order of the data returned in the response. You can use this parameter to supply a dimension you want to sort on.

A sortable field uses the following form: 

*operator* *field_name*

You can use at most two sortable fields in one URL path. Use a comma to separate sortable fields. For example:  *operator* *field_name*, *operator* *field_name*  

*operator* is used to mark the order of sequencing. The operator is optional. If you only specify the sortable field without any operator, the response data is sorted in descending order by this field.

  - The `-` operator indicates an ascending order.
  - The `+` operator indicates a descending order.

By default, the response data is displayed in descending order by refund number.

*field_name* indicates the name of a sortable field. The supported sortable fields of this operation are as below:

  - number
  - accountId
  - amount
  - refundDate
  - paymentId
  - createdDate
  - createdById
  - updatedDate
  - updatedById
  
Examples:

- /v1/refunds?sort=+number

- /v1/refunds?status=Processed&sort=-number,+amount


### Delete refund

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Deletes a refund. You can delete a refund with the Canceled or Error status. <br/>
> <br/>
> If you have the Invoice Settlement feature enabled, refunds applied to credit balance cannot be deleted.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Get refund

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about a specific refund.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Update refund

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Updates the basic and finance information about a refund.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Cancel refund

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Cancels a refund.<br/>
> <br/>
> If you have the Invoice Settlement feature enabled, refunds applied to credit balance cannot be cancelled.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.      


### Get refund parts

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about all parts of a refund.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Get refund part

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the information about a specific refund part.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `refundpartid` - _required_ - The unique ID of a specific refund part. You can get the refund part ID from the response of [Get refund parts](https://www.zuora.com/developer/api-reference/#operation/GET_RefundParts).

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Get refund part items

> **Note:** The Invoice Item Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at  [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the information about all items of a refund part. A refund part item is a single line item in a refund part. A refund part can consist of several different types of items.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `refundpartid` - _required_ - The unique ID of a specific refund part. You can get the refund part ID from the response of [Get refund parts](https://www.zuora.com/developer/api-reference/#operation/GET_RefundParts).

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Get refund part item

> **Note:** The Invoice Item Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at  [Zuora Global Support](http://support.zuora.com/).  <br/>
> <br/>
> Retrieves the information about a specific refund part item. A refund part item is a single line item in a refund part. A refund part can consist of several different types of items.

*Tags:* `Refunds`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `itempartid` - _required_ - The unique ID of a specific refund part item. You can get the refund part item ID from the response of [Get refund part items](https://www.zuora.com/developer/api-reference/#operation/GET_RefundItemParts).

* `refundpartid` - _required_ - The unique ID of a specific refund part. You can get the refund part ID from the response of [Get refund parts](https://www.zuora.com/developer/api-reference/#operation/GET_RefundParts).

* `refundId` - _required_ - The unique ID of a refund. For example, 4028905f5a87c0ff015a889e590e00c9.


### Get revenue events for a revenue schedule

> This REST API reference describes how to get all revenue events in a revenue schedule by specifying the revenue schedule number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Events`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".

### Get revenue event details

> This REST API reference describes how to get revenue event details by specifying the revenue event number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Events`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `event-number` - _required_ - The number associated with the revenue event.

### Get revenue items by charge revenue summary number

> This REST API reference describes how to get the details for each revenue item in a charge revenue summary by specifying the charge revenue summary number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `crs-number` - _required_ - The charge revenue summary number.

### Get revenue items by revenue event number

> This REST API reference describes how to get the details of each revenue item in a revenue event by specifying the revenue event number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `event-number` - _required_ - The number associated with the revenue event.

### Update custom fields on revenue items by revenue event number

> This REST API reference describes how to update custom fields on revenue items by specifying the revenue event number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `event-number` - _required_ - The number associated with the revenue event.

### Get revenue items by revenue schedule

> This REST API reference describes how to get the details for each revenue items in a revenue schedule by specifying the revenue schedule number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".

### Update custom fields on revenue items by revenue schedule number

> This REST API reference describes how to update custom fields on revenue Items by specifying the revenue schedule number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".

### Get revenue recognition rule by product rate plan charge

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves the revenue recognition rule associated with a production rate plan charge by specifying the charge ID.

*Tags:* `Revenue Rules`

#### Input Parameters
* `charge-key` - _required_ - The unique ID of a product rate plan charge. For example, 8a8082e65ba86084015bb323d3c61d82.


### Get revenue recognition rule by subscription charge

> Retrieves the revenue recognition rule associated with a subscription charge by specifying the charge ID. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Rules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `charge-key` - _required_ - The unique ID of the subscription rate plan charge. For example, 402892793e173340013e173b81000012.


### Get revenue schedule by credit memo item ID

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the details about a revenue schedule by specifying a valid credit memo item ID.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `cmi-id` - _required_ - The unique ID of a credit memo item. You can get the credit memo item ID from the response of [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems).


### Create revenue schedule for credit memo item (manual distribution)

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates a revenue schedule for a credit memo item, and manually distribute the revenue.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `cmi-id` - _required_ - The unique ID of a credit memo item. You can get the credit memo item ID from the response of [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems).


### Create revenue schedule for credit memo item (distribute by date range)

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates a revenue schedule for a credit memo item, and automatically distribute the revenue by specifying the recognition start and end dates.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `cmi-id` - _required_ - The unique ID of a credit memo item. You can get the credit memo item ID from the response of [Get credit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_CreditMemoItems).


### Get revenue schedule by debit memo item ID

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the details about a revenue schedule by specifying a valid debit memo item ID.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `dmi-id` - _required_ - The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems).


### Create revenue schedule for debit memo item (manual distribution)

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates a revenue schedule for a debit memo item, and manually distribute the revenue.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `dmi-id` - _required_ - The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems).


### Create revenue schedule for debit memo item (distribute by date range)

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Creates a revenue schedule for a debit memo item, and automatically distribute the revenue by specifying the recognition start and end dates.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `dmi-id` - _required_ - The unique ID of a debit memo item. You can get the debit memo item ID from the response of [Get debit memo items](https://www.zuora.com/developer/api-reference/#operation/GET_DebitMemoItems).


### Get revenue schedule by invoice item adjustment

> Retrieves the details of a revenue schedule by specifying a valid invoice item adjustment identifier. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoice-item-adj-key` - _required_ - ID or number of the Invoice Item Adjustment, for example, e20b07fd416dcfcf0141c81164fd0a72.

### Create revenue schedule for Invoice Item Adjustment (manual distribution)

> Creates a revenue schedule for an Invoice Item Adjustment and manually distribute the revenue.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoice-item-adj-key` - _required_ - ID or number of the Invoice Item Adjustment, for example, e20b07fd416dcfcf0141c81164fd0a72.
If the specified Invoice Item Adjustment is already associated with a revenue schedule, the call will fail.


### Create revenue schedule for Invoice Item Adjustment (distribute by date range)

> Creates a revenue schedule for an Invoice Item Adjustment and distribute the revenue by specifying the recognition start and end dates.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoice-item-adj-key` - _required_ - ID or number of the Invoice Item Adjustment, for example, e20b07fd416dcfcf0141c81164fd0a72.
If the specified Invoice Item Adjustment is already associated with a revenue schedule, the call will fail.


### Get revenue schedule by invoice item ID

> Retrieves the details of a revenue schedule by specifying the invoice item ID.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoice-item-id` - _required_ - A valid Invoice Item ID.

### Create revenue schedule for Invoice Item (manual distribution)

> Creates a revenue schedule for an Invoice Item and manually distribute the revenue.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoice-item-id` - _required_ - ID of the Invoice Item, for example, e20b07fd416dcfcf0141c81164fd0a75.
If the specified Invoice Item is already associated with a revenue schedule, the call will fail.


### Create revenue schedule for Invoice Item (distribute by date range)

> Creates a revenue schedule for an Invoice Item and distribute the revenue by specifying the recognition start and end dates.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `invoice-item-id` - _required_ - ID of the Invoice Item, for example, e20b07fd416dcfcf0141c81164fd0a75.
If the specified Invoice Item is already associated with a revenue schedule, the call will fail.


### Get all revenue schedules of product charge by charge ID and billing account ID

> **Note:** This feature is only available if you have the Invoice Settlement feature enabled. The Invoice Settlement feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/).<br/>
> <br/>
> Retrieves the details about all revenue schedules of a product rate plan charge by specifying the charge ID and billing account ID.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `pageSize` - _optional_ - Number of rows returned per page.

* `account-key` - _required_ - The account number or account ID.

* `charge-key` - _required_ - The unique ID of a product rate plan charge. For example, 8a8082e65ba86084015bb323d3c61d82.


### Get revenue schedule by subscription charge

> Retrieves the revenue schedule details by specifying subscription charge ID. Request and response field descriptions and sample code are provided

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `charge-key` - _required_ - ID of the subscription rate plan charge; for example, 402892793e173340013e173b81000012.

### Create revenue schedule on subscription charge

> Creates a revenue schedule by specifying the subscription charge. This method is for custom unlimited revenue recognition only.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `charge-key` - _required_ - ID of the subscription rate plan charge; for example, 402892793e173340013e173b81000012.

### Delete revenue schedule

> Deletes a revenue schedule by specifying its revenue schedule number<br/>
> ## Prerequisites<br/>
> You must have the Delete Custom Revenue Schedule permissions in Zuora Finance.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - 
Revenue schedule number of the revenue schedule you want to delete, for example, RS-00000256. To be deleted, the revenue schedule:
* Must be using a custom unlimited recognition rule.
* Cannot have any revenue in a closed accounting period.
* Cannot be included in a summary journal entry.
* Cannot have a revenue schedule date in a closed accounting period.


### Get revenue schedule details

> Retrieves the details of a revenue schedule by specifying the revenue schedule number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".


### Update revenue schedule basic information

> Retrieves basic information of a revenue schedule by specifying the revenue schedule number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".


### Distribute revenue across accounting periods

> Distributes revenue by specifying the revenue schedule number. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".


### Distribute revenue on specific date

> Distributes revenue on a specific recognition date. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - Revenue schedule number. The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".


### Distribute revenue by recognition start and end dates

> Distributes revenue by specifying the recognition start and end dates. Request and response field descriptions and sample code are provided.

*Tags:* `Revenue Schedules`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `rs-number` - _required_ - Revenue schedule number. Specify the revenue schedule whose revenue you want to distribute.
  
The revenue schedule number is always prefixed with "RS", for example, "RS-00000001".


### Generate RSA signature

> The REST API used in Payment Pages 2.0 are CORS (Cross-Origin Resource Sharing) enabled and therefore requires a digital signature. The POST rsa_signatures call generates and returns the required digital signature and token for a Payment Pages 2.0 form. You need to pass the generated signature to your client for it to access Payment Pages 2.0. <br/>
>   <br/>
> This REST service should be used only when you implement Payment Pages 2.0.

*Tags:* `RSA Signatures`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Decrypt RSA signature

> The REST API used in Payment Pages 2.0 are CORS (Cross-Origin Resource Sharing) enabled and therefore requires a digital signature. You use rsa_signatures to generate the required digital signature and token for a Payment Pages 2.0 form, and then you use the decrypt REST service to decrypt the signature to validate the signature and key.<br/>
> <br/>
> This REST service should be used only when you implement Payment Pages 2.0.

*Tags:* `RSA Signatures`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get the revenue automation start date

> This REST API reference describes how to get the revenue automation start date. Request and response field descriptions and sample code are provided.

*Tags:* `Settings`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Create subscription

> This REST API reference describes how to create a new subscription for an existing customer account.<br/>
> <br/>
> ## Notes<br/>
> This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> <br/>
> If invoiceCollect is `true`, the call will not return success = `true` unless the subscription, invoice, and payment are all successful.<br/>
> <br/>
> Default values for **customerAcceptanceDate** and **serviceActivationDate** are set as follows.<br/>
> <br/>
> |        | serviceActivationDate(SA) specified          | serviceActivationDate (SA) NOT specified  |<br/>
> | ------------- |:-------------:| -----:|<br/>
> | customerAcceptanceDate (CA) specified| SA uses value in the request call; CA uses value in the request call| CA uses value in the request call;SA uses CE as default |<br/>
> | customerAcceptanceDate (CA) NOT specified      | SA uses value in the request call; CA uses SA as default |   SA and CA use CE as default |

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the following fields:
* invoice
* collect
* runBilling
* targetDate


### Get subscriptions by account

> Retrieves all subscriptions associated with the specified account. Zuora only returns the latest version of the subscriptions.<br/>
> <br/>
> Subscription data is returned in reverse chronological order based on `updatedDate`.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `account-key` - _required_ - 
Possible values are:
* an account number
* an account ID

* `charge-detail` - _optional_ - The segmented rate plan charges.

When an amendment results in a change to a charge, Zuora creates a segmented rate plan charge. Use this field to track segment charges.

Possible values are:

* __last-segment__: (Default) The last rate plan charge on the subscription. The last rate plan charge is the last one in the order of time on the subscription rather than the most recent changed charge on the subscription.
 * __current-segment__: The segmented charge that is active on today's date (effectiveStartDate <= today's date < effectiveEndDate).
 
 * __all-segments__: All the segmented charges. The `chargeSegments` field is returned in the response. The `chargeSegments` field contains an array of the charge information for all the charge segments.

 * __specific-segment&as-of-date=date__: The segmented charge that is active on a date you specified (effectiveStartDate <= specific date < effectiveEndDate). The format of the date is yyyy-mm-dd.


### Preview subscription

> The REST API reference describes how to create a new subscription in preview mode. This call does not require a valid customer account. It can be used to show potential new customers a preview of a subscription with complete details and charges before creating an account, or to let existing customers preview a subscription with all charges before committing.<br/>
> <br/>
> ## Notes<br/>
> - This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> - The response of the Preview Subscription call is based on the REST API minor version you set in the request header. The response structure might be different if you use different minor version numbers. <br/>
> <br/>
> - If you have the Invoice Settlement feature enabled, we recommend that you set the `zuora-version` parameter to `207.0` or later. Otherwise, an error is returned.<br/>
> <br/>
> <br/>
> - Default values for **customerAcceptanceDate** and **serviceActivationDate** are set as follows.<br/>
> <br/>
> |        | serviceActivationDate (SA) specified          | serviceActivationDate (SA) NOT specified  |<br/>
> | ------------- |:-------------:| -----:|<br/>
> | customerAcceptanceDate (CA) specified      | SA uses value in the request call; CA uses value in the request call| CA uses value in the request call;SA uses CE as default |<br/>
> | customerAcceptanceDate (CA) NOT specified      | SA uses value in the request call; CA uses SA as default |   SA and CA use CE as default |

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. 

You need to set this parameter if you use the following fields:
* targetDate
* includeExistingDraftDocItems
* previewType


If you have the Invoice Settlement feature enabled, you need to specify this parameter. Otherwise, an error is returned.


See [Zuora REST API Versions](https://www.zuora.com/developer/api-reference/#section/API-Versions) for more information. 


### Get subscriptions by key

> This REST API reference describes how to retrieve detailed information about a specified subscription in the latest version.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `subscription-key` - _required_ - Possible values are:
  * a subscription number
  * a subscription ID

* `charge-detail` - _optional_ - 
The segmented rate plan charges. When an amendment results in a change to a charge, Zuora creates a segmented rate plan charge. Use this field to track segment charges.

Possible values are:

 * __last-segment__: (Default) The last rate plan charge on the subscription. The last rate plan charge is the last one in the order of time on the subscription rather than the most recent changed charge on the subscription.
 * __current-segment__: The segmented charge that is active on today's date (effectiveStartDate <= today's date < effectiveEndDate).
 
 * __all-segments__: All the segmented charges. The `chargeSegments` field is returned in the response. The `chargeSegments` field contains an array of the charge information for all the charge segments.

 * __specific-segment&as-of-date=date__: The segmented charge that is active on a date you specified ((specific date = effectiveStartDate) OR (effectiveStartDate < specific date < effectiveEndDate)). The format of the date is yyyy-mm-dd.


### Update subscription

> Use this call to make the following kinds of changes to a subscription:<br/>
>   * Add a note<br/>
>   * Change the renewal term or auto-renewal flag<br/>
>   * Change the term length or change between evergreen and termed<br/>
>   * Add a new product rate plan<br/>
>   * Remove an existing subscription rate plan<br/>
>   * Change the quantity or price of an existing subscription rate plan<br/>
> <br/>
> ## Notes<br/>
> * This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.<br/>
> * The Update Subscription call creates a new subscription, which has the old subscription number but a new subscription ID.  The old subscription is canceled but remains in the system.<br/>
> * In one request, this call can make:<br/>
>   * Up to 9 combined add, update, and remove changes<br/>
>   * No more than 1 change to terms & conditions<br/>
> * Updates are performed in the following sequence:<br/>
>   1. First change the notes on the existing subscription, if requested.<br/>
>   2. Then change the terms and conditions, if requested.<br/>
>   3. Then perform the remaining amendments based upon the effective dates specified. If multiple amendments have the same contract-effective dates, then execute adds before updates, and updates before removes.<br/>
> * The update operation is atomic. If any of the updates fails, the entire operation is rolled back.<br/>
> * The response of the Update Subscription call is based on the REST API minor version you set in the request header. The response structure might be different if you use different minor version numbers. <br/>
> * If you have the Invoice Settlement feature enabled, we recommend that you set the `zuora-version` parameter to `207.0` or later. Otherwise, an error is returned.<br/>
> <br/>
> ## Override a Tiered Price<br/>
> There are two ways you override a tiered price:<br/>
> <br/>
> * Override a specific tier number<br/>
> For example: `tiers[{tier:1,price:8},{tier:2,price:6}]`<br/>
> <br/>
> * Override the entire tier structure<br/>
> For example:  `tiers[{tier:1,price:8,startingUnit:1,endingUnit:100,priceFormat:"FlatFee"},<br/>
> {tier:2,price:6,startingUnit:101,priceFormat:"FlatFee"}]`<br/>
> <br/>
> If you just override a specific tier, do not include the `startingUnit` field in the request.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - 
The minor version of the Zuora REST API. 

You need to set this parameter if you use the following fields:
* collect
* invoice
* includeExistingDraftDocItems
* previewType
* runBilling
* targetDate


If you have the Invoice Settlement feature enabled, you need to specify this parameter. Otherwise, an error is returned.


See [Zuora REST API Versions](https://www.zuora.com/developer/api-reference/#section/API-Versions) for more information.

* `subscription-key` - _required_ - Subscription number or ID.

### Cancel subscription

> This REST API reference describes how to cancel an active subscription.<br/>
> <br/>
> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the following fields:
* invoice
* collect
* runBilling
* targetDate 

* `subscription-key` - _required_ - Subscription number or ID. Subscription status must be `Active`.

### Renew subscription

> Renews a termed subscription using existing renewal terms.<br/>
> <br/>
>  **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the following fields:
* invoice
* collect
* runBilling
* targetDate 

* `subscription-key` - _required_ - Subscription number or ID

### Resume subscription

> This REST API reference describes how to resume a suspended subscription. <br/>
> <br/>
> This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://suport.zuora.com). <br/>
> <br/>
> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders API Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the following fields:
* invoice
* collect
* runBilling
* targetDate

* `subscription-key` - _required_ - Subscription number or ID. Subscription status must be Active.

### Suspend subscription

> This REST API reference describes how to suspend an active subscription. <br/>
> <br/>
> This feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://suport.zuora.com).<br/>
> <br/>
> **Note:** This feature is unavailable if you have the Orders feature enabled. See [Orders API Migration Guidance](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AB_Orders_Migration_Guidance) for more information.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `zuora-version` - _optional_ - The minor version of the Zuora REST API. 

You only need to set this parameter if you use the following fields:
* invoice
* collect
* runBilling
* targetDate

* `subscription-key` - _required_ - Subscription number or ID. Subscription status must be Active.

### Get subscriptions by key and version

> This REST API reference describes how to retrieve detailed information about a specified subscription in a specified version. When you create a subscription amendment, you create a new version of the subscription. You can use this method to retrieve information about a subscription in any version.

*Tags:* `Subscriptions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `subscription-key` - _required_ - Subscription number. For example, A-S00000135.

* `version` - _required_ - Subscription version. For example, 1.

* `charge-detail` - _optional_ - 
The segmented rate plan charges. When an amendment results in a change to a charge, Zuora creates a segmented rate plan charge. Use this field to track segment charges.

Possible values are:

 * __last-segment__: (Default) The last rate plan charge on the subscription. The last rate plan charge is the last one in the order of time on the subscription rather than the most recent changed charge on the subscription.
 * __current-segment__: The segmented charge that is active on today's date (effectiveStartDate <= today's date < effectiveEndDate).
 
 * __all-segments__: All the segmented charges. The `chargeSegments` field is returned in the response. The `chargeSegments` field contains an array of the charge information for all the charge segments.

 * __specific-segment&as-of-date=date__: The segmented charge that is active on a date you specified (effectiveStartDate <= specific date < effectiveEndDate). The format of the date is yyyy-mm-dd.


### Update subscription custom fields

> **Note:**  This operation is only available if you have the [Orders](https://knowledgecenter.zuora.com/BC_Subscription_Management/Orders/AA_Overview_of_Orders#Orders) feature enabled. The migration to Orders is in **Limited Availability**. We are actively soliciting feedback from a small set of early adopters before releasing as generally available.<br/>
> <br/>
> <br/>
> Updates the custom fields of a specified subscription.

*Tags:* `Orders`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `subscriptionNumber` - _required_ - The subscription number to be updated.

### Delete taxation item

> Deletes a specific taxation item by ID.

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The unique ID of a taxation item.


### Get taxation item

> Retrieves the information about a specific taxation item by ID.

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The unique ID of a taxation item.


### Update taxation item

> Updates a specific taxation item by ID.

*Tags:* `Taxation Items`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `id` - _required_ - The unique ID of a taxation item.


### Get invoices

> Retrieves invoices for a specified account. <br/>
> Invoices are returned in reverse chronological order by **updatedDate**.

*Tags:* `Transactions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `account-key` - _required_ - Account number or account ID.


### Get payments

> Retrieves payments for a specified account. Payments are returned in<br/>
> reverse chronological order by **updatedDate**.

*Tags:* `Transactions`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `account-key` - _required_ - Account number or account ID.

### Post usage

> This REST API reference describes how to post or import usage data for one or more accounts in the CSV format. There are no path or query parameters. The data is uploaded using the HTTP multipart/form-data POST method and applied to the user's tenant. <br/>
> <br/>
> ## How this REST API Call Works<br/>
> The content of the uploaded usage file must follow the format used by the UI import tool. It must be a comma-separated (CSV) file with a corresponding .csv extension. The length of the file name must not exceed 50 characters. The file size must not exceed 4MB. See [Downloading the Usage Template](https://knowledgecenter.zuora.com/CB_Billing/J_Billing_Operations/Usage/C_Import_Usage_Data#Downloading_the_Usage_Template) to learn about how to download the usage file template.<br/>
> <br/>
> At the completion of the upload, before the file contents are actually being processed, the API returns a response containing the byte count of the received file and a URL for checking the status of the import process.  Of the five possible results displayed at that URL (Pending, Processing, Completed, Canceled, and Failed) only a Completed status indicates that the import was successful.  The operation is atomic; if any record fails, the file is rejected. In that case, the entire import is rolled back and all stored data is returned to its original state.<br/>
> <br/>
> To view the actual import status, enter the resulting status URL from the checkImportStatus response using a tool such as POSTMAN. This additional step provides more information about why the import has failed.<br/>
> <br/>
> To manage the information after a successful upload, use the web-based UI.<br/>
> <br/>
> ## Usage File Format<br/>
> The usage file uses the following headings: <br/>
> <br/>
> | Heading         | Description   | Required |<br/>
> |-----------------|--------|----------|<br/>
> | ACCOUNT_ID      | Enter the account number, e.g., the default account number, such as A00000001, or your custom account number. Although this field is labeled as Account_Id, it is not the actual Account ID nor Account Name.  | Yes      |<br/>
> | UOM             | Enter the unit of measure. This must match the UOM for the usage. | Yes      |<br/>
> | QTY             | Enter the quantity.  | Yes      |<br/>
> | STARTDATE       | Enter the start date of the usage. This date determines the invoice item service period the associated usage is billed to. Date format is based on locale of the current user. Default date format: `MM/DD/YYYY`. | Yes |<br/>
> | ENDDATE         | Enter the end date of the usage. This is not used in calculations for usage billing and is optional. Date format is based on locale of the current user. Default date format: `MM/DD/YYYY`. <p>**Note:** The value of this column is optional, but the column header is required.</p> | No |<br/>
> | SUBSCRIPTION_ID | Enter the subscription number or subscription name. If you created the subscription in the Zuora application, Zuora created a number automatically in a format similar to A-S00000001. If you do not provide a value for this field, the associated usage will be added to all subscriptions for the specified Account that use this Unit Of Measure. If your Accounts can have multiple subscriptions and you do not want double or triple counting of usage, you must specify the Subscription or Charge ID in each usage record.  <p>**Note:** The value of this column is optional, but the column header is required.</p>  | No   |<br/>
> | CHARGE_ID       | Enter the charge number (not the charge name). You can see the charge ID, e.g., C-00000001, when you add your rate plan to your subscription and view your individual charges. If your Accounts can have multiple subscriptions and you do not want double or triple counting of usage, you must specify the specific Subscription or Charge ID in each usage record. This field is related to the Charge Number on the subscription rate plan.  <p>**Note:** The value of this column is optional, but the column header is required.</p>  | No      |<br/>
> | DESCRIPTION     | Enter a description for the charge. | No       |

*Tags:* `Usage`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.


### Get usage

> This REST API reference describes how to retrieve usage details for an account. Usage data is returned in reverse chronological order.

*Tags:* `Usage`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `pageSize` - _optional_ - Number of rows returned per page.

* `account-key` - _required_ - Account number or account ID.

### Multi-entity: Accept user access

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Accepts user access to an entity.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the calls as an administrator of the entity that you want to accept the user access to.

*Tags:* `Users`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `username` - _required_ - Specify the login name of the user that you want to accept the access request for.


### Multi-entity: Get entities that a user can access

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Retrieves detailed information about all the entities that a user has permission to access.<br/>
> <br/>
> ## User Access Permission<br/>
> You can make the call as any entity user.

*Tags:* `Users`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `username` - _required_ - Specify the login user name that you want to retrieve.


### Multi-entity: Deny user access

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Denies a user access to an entity. <br/>
> <br/>
> ## User Access Permission<br/>
> You must make the calls as an administrator of the entity that you want to deny the user access to.

*Tags:* `Users`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `username` - _required_ - Specify the login name of the user that you want to deny the access.


### Multi-entity: Send user access requests

> **Note:** The Multi-entity feature is in **Limited Availability**. If you wish to have access to the feature, submit a request at [Zuora Global Support](http://support.zuora.com/). <br/>
> <br/>
> Sends access requests to the entities that a user wants to access.<br/>
> <br/>
> ## User Access Permission<br/>
> You must make the call as an administrator of the entity, in which the request user is created. Also, this administrator must have the permission to access the entities that the request user wants to access.

*Tags:* `Users`

#### Input Parameters
* `Zuora-Entity-Ids` - _optional_ - An entity ID. If you have [Zuora Multi-entity](https://knowledgecenter.zuora.com/BB_Introducing_Z_Business/Multi-entity) enabled and the OAuth token is valid for more than one entity, you must use this header to specify which entity to perform the operation in. If the OAuth token is only valid for a single entity, or you do not have Zuora Multi-entity enabled, you do not need to set this header.

* `username` - _required_ - Specify the login name of the user who wants to access other entities.


## License

**flow**ground :- Telekom iPaaS / zuora-com-connector<br/>
Copyright © 2019, [Deutsche Telekom AG](https://www.telekom.de)<br/>
contact: flowground@telekom.de

All files of this connector are licensed under the Apache 2.0 License. For details
see the file LICENSE on the toplevel directory.
