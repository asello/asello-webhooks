# asello Webhooks

This repository contains examples and instructions for implementing asello webhooks. Currently the following actions / events are available:

- document created
- document updated
- receipt created
- receipt updated
- invoice created
- invoice updated
- deliverynote created
- deliverynote updated
- order created
- order updated
- deliveryorder created
- deliveryorder updated

The webhooks can be configured in asello. You need the following parameters:

- description
- action / event
- uri
- secret
- paused

## Implementation

You must provide a http rest service that is available on the Internet and that implements a rest route (for example, https://example.com/webhook). The route must support the GET and POST methods.

### GET method

The GET method is used to check the operation of the remote server. An echo request is sent to the Webhook URL. The response must provide the echo query parameter as content and return it as "text/plain" content.

**Request**

GET https://example.com/webhook?echo=4acbe33406244d109888260d2c61b844

**Response**

Content-Type: text/plain

4acbe33406244d109888260d2c61b844

### POST method

The POST method is called whenever the webhook is triggered. The request should be made as fast as possible. It is recommended that you use a message queue to store incoming Webhook messages and process them with a worker process.

**Request**

GET https://example.com/webhook
signature:sha256=3E556EFE80B970D65449A076D52698DF028CCFD2F7361B25E3EA948661040560
request-id:"|4ec68e80deb0ed459e52320821cc4d63.b25b135c_b25b135d_21.

```json
{
  "id": "642f2a88afc54fb5b3dc5e93a48dad6a",
  "attempt": 1,
  "properties": {},
  "notifications": [
    {
      "action": "document.created",
      "id": 9420657
    }
  ]
}
```

**Signed Message**

The message is signed with a Hmac Sha256. The signature and the hashing algorithm are stored in the "signature" header.

```
signature:sha256=3E556EFE80B970D65449A076D52698DF028CCFD2F7361B25E3EA948661040560
```

To validate the signature, you need to calculate the hmac over the body and convert the result to hex format.

Node.js example:

```javascript
var secret = "test-example-secret-with-minimum-length-32-chars";
var calculatedHash = crypto.createHmac('sha256', secret).update(req.body).digest('hex');

if(hash.toLocaleLowerCase() != calculatedHash.toLocaleLowerCase()) {
    console.log("hash error");
}
```

## Examples

In this repository you will find an example server written in node.js.

## Need Help?

Get in touch with the asello team (support@asello.at).