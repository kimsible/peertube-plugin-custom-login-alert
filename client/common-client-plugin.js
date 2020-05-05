async function register ({ registerHook, peertubeHelpers }) {
  registerHook({
    target: 'action:router.navigation-end',
    handler: async ({ path }) => {
      if (/^\/login$/.test(path)) {
        try {
          // Waiting for DOMContent updated with a timeout of 5 seconds
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(() => {
              clearInterval(interval)
              reject(new Error('DOMContent cannot be loaded'))
            }, 5000)

            // Waiting for component in DOM
            const interval = setInterval(() => {
              if (document.querySelector('my-login .alert') !== null) {
                clearTimeout(timeout)
                clearInterval(interval)
                resolve()
              }
            }, 10)
          })

          const component = document.querySelector('my-login .alert')

          const { message } = await peertubeHelpers.getSettings()

          if (message) {
            const { markdownRenderer } = peertubeHelpers

            if (typeof markdownRenderer !== 'undefined') {
              component.innerHTML = await markdownRenderer.textMarkdownToHTML(message)
            } else {
              component.innerHTML = message
            }
          }

          component.classList.add('fade')
        } catch (error) {
          console.error(error)
        }
      }
    }
  })
}

export {
  register
}
