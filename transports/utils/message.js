const {RESPONSES: {NO_RESULT}} = require("../../constants");
const RESPONSE_TYPES = {
  TEXT: 'text',
  LOCATION: 'location',
};

class Message {
  constructor(data) {
    this._data = data;
    this.response = {};
  }

  get username() {
    return this._data.from.username;
  }

  get userId() {
    return this._data.from.id;
  }

  get text() {
    return (this._data.text || '').toLowerCase().trim();
  }

  get command() {
    if (!this.isCommand()) {
      console.error('not a command', this.text());
      throw new Error('not a command');
    }
    return this.text.replace('/', '');
  }

  get location() {
    return this._data.location;
  }

  isCommand() {
    return this.text.startsWith('/');
  }

  addResponse(type, response) {
    this.response[type] = this.response[type] || [];
    this.response[type].push(response);
  }

  addTextResponse(text) {
    text && this.addResponse(RESPONSE_TYPES.TEXT, text);
  }

  addAnswersResponse(answers, joiner = '\n', header) {
    if (!answers.length) {
      this.addTextResponse(header ? `*${header}*${joiner}${NO_RESULT}` : NO_RESULT);
      return;
    }

    this.addTextResponse(`${header ? `*${header}*\n` : ''}${(answers.length ? answers.map(answer => `\`${answer}\``) : [NO_RESULT]).join(joiner)}`);
  }
}

module.exports = {
  Message,
  RESPONSE_TYPES,
};
