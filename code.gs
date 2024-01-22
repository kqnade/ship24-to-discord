function doPost(e) {
  var payload = JSON.parse(e.postData.contents);
  var discordWebhookUrl = "https://discord.com/api/webhooks/webhook";

  var currentDate = new Date();
  var formattedDate = currentDate.toLocaleString();

  var embedMessage = {
    embeds: [
      {
        title: "Ship24: Update Package Status",
        fields: [
          {
            name: "Tracking Number",
            value: payload.trackings[0].tracker.trackingNumber
          },
          {
            name: "Status",
            value: payload.trackings[0].events[0].status + " (" + payload.trackings[0].events[0].statusCode + ")"
          },
          {
            name: "Courier",
            value: payload.trackings[0].shipment.delivery.service + " (" + payload.trackings[0].events[0].courierCode + ")"
          },
          {
            name: "Recipient",
            value: "Name: " + payload.trackings[0].shipment.recipient.name + "\n" +
                  "Address: " + payload.trackings[0].shipment.recipient.address + "\n" +
                  "Post-Code: " + payload.trackings[0].shipment.recipient.postCode
          },
          {
            name: "Update Date",
            value: formattedDate
          }
        ]
      }
    ]
  };

  sendToDiscordWebhook(discordWebhookUrl, embedMessage);
}

function sendToDiscordWebhook(discordUrl, message) {

  var payload = JSON.stringify(message);

  var params = {
    headers: {
      'Content-Type': 'application/json'
    },
    method: "POST",
    payload: payload,
    muteHttpExceptions: true
  };

  var response = UrlFetchApp.fetch(discordUrl, params);

  Logger.log(response.getContentText());

}
