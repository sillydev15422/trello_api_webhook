const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const axios = require('axios');
const mongoose = require('mongoose');
const callbackURL = 'https://38ba-188-43-136-33.jp.ngrok.io/trello-webhook';

mongoose.connect('mongodb://localhost:27017/').then(() => {});

const apiKey = '7c1b127ab842ef6b6163f45eaa980d4b';
const token =
  'ATTA463bd12303cd72bef013f6480b51a5124b66c2424fd6977c624dd3693996bdf3D71D9192';

(async () => {
  // Get all your boards
  const boardsResponse = await axios.get(
    `https://api.trello.com/1/members/me/boards?key=${apiKey}&token=${token}`
  );
  const boards = boardsResponse.data;
  console.log(boards);
  // Set up webhooks for all boards
  for (const board of boards) {
    try {
      const webhookResponse = await axios.post(
        `https://api.trello.com/1/webhooks/?callbackURL=${callbackURL}&idModel=${board.id}&key=${apiKey}&token=${token}`
      );

      console.log(
        `Webhook created for board ${board.name} with ID ${webhookResponse.data.id}`
      );
    } catch (error) {
      console.error(
        `Error creating webhook for board ${board.name}:`,
        error.message
      );
    }
  }
})();

app.post('/trello-webhook', async (req, res) => {
  const payload = req.body;
  console.log('okok');
  if (payload.action && payload.action.type === 'commentCard') {
    const cardId = payload.action.data.card.id;
    // Get card details
    const cardResponse = await axios.get(
      `https://api.trello.com/1/cards/${cardId}?key=${apiKey}&token=${token}`
    );
    const card = cardResponse.data;
    console.log(payload.action.memberCreator.id);
    if (card.idMembers.includes(payload.action.memberCreator.id)) {
      console.log(
        'New comment on a card assigned to you:',
        payload.action.data.text
      );
      console.log(payload.action.data.text);
    }
  }

  res.status(200).send('OK');
});

app.use('/sendComment', (req, res) => {
  const cardName = 'asdfasdf'
  const cardResponse = await axios.get(
    ``
  )
  try {
    axios.post(`https://api.trello.com/1/cards/{id}/actions/comments?text={text}&key=APIKey&token=APIToken`)
  } catch (error) {}
});

const port = process.env.PORT || 80;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
