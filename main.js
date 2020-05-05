async function register ({ registerSetting, getRouter }) {
  registerSetting({
    name: 'message',
    label: 'Login Alert Message',
    type: getRouter !== undefined ? 'markdown-text' : 'input-textarea', // use markdown-text only if implemented
    private: false
  })
}

async function unregister () {}

module.exports = {
  register,
  unregister
}
