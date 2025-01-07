const paypal = require('@paypal/checkout-server-sdk')

function createPaypalClient() {
  const clientId =
    'AUzYohMWOOqPhnn_zFHWvF2HVIvZegDPR3uUjBeR9WVnvtFbiWehS6vvrc1FNdHvKFZXfBteDjPcFmbR'
  const clientSecret =
    'EOfIS6kRv8I_r8d6rxUUq3Yw9KvOuOq95e5Jhs7rPHY4ui1IpGPOSQep-6Y84TLAMxRnxEAxWnCCgubd'

  const environment = new paypal.core.SandboxEnvironment(clientId, clientSecret)
  const client = new paypal.core.PayPalHttpClient(environment)
  return client
}

module.exports = createPaypalClient
