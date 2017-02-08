;(function(window) {

  var svgSprite = '<svg>' +
    '' +
    '<symbol id="icon-setting" viewBox="0 0 1024 1024">' +
    '' +
    '<path d="M492.085706 447.376496c-42.502649 0-76.983113 34.46205-76.983113 76.964699 0 42.49958 34.481487 76.983113 76.983113 76.983113 42.501626 0 76.983113-34.483532 76.983113-76.983113C569.068819 481.838545 534.587333 447.376496 492.085706 447.376496z"  ></path>' +
    '' +
    '<path d="M825.643732 447.376496l-62.18575 0c-6.256527-21.952064-14.956947-42.781922-25.984639-62.209279l44.826853-44.826853c20.170038-20.167992 20.170038-52.816304 0-72.953606l-36.485499-36.487544c-20.129119-20.138326-52.809143-20.138326-72.937239 0l-45.628867 45.639097c-18.242749-9.974026-37.769335-17.78241-58.179772-23.566322L569.068819 190.762709c0-28.347716-22.974018-51.322757-51.319688-51.322757l-51.32378 0c-28.348739 0-51.322757 22.974018-51.322757 51.322757l0 62.209279c-21.170509 5.993622-41.339524 14.283828-60.184807 24.778549l-46.831888-46.851325c-20.167992-20.138326-52.806074-20.138326-72.93417 0l-36.486521 36.487544c-20.169015 20.138326-20.169015 52.785614 0 72.953606l46.830865 46.831888c-10.503928 18.84426-18.763445 39.013275-24.778549 60.204244L158.528703 447.376496C130.179964 447.376496 107.205946 470.331077 107.205946 498.679816l0 51.303321c0 28.325211 22.974018 51.341171 51.322757 51.341171l62.188819 0c5.813578 20.391001 13.592296 39.937023 23.535632 58.179772l-45.587948 45.628867c-20.169015 20.148555-20.169015 52.806074 0 72.953606l36.486521 36.469131c20.128096 20.146509 52.766178 20.146509 72.93417 0l44.826853-44.848336c19.446793 11.025646 40.257215 19.786422 62.188819 26.003053l0 62.207233c0 28.327257 22.974018 51.304344 51.322757 51.304344l51.32378 0c28.34567 0 51.319688-22.977087 51.319688-51.304344l0-62.207233c21.171532-6.014082 41.339524-14.295081 60.183784-24.779572l43.624855 43.624855c20.128096 20.146509 52.80812 20.146509 72.937239 0l36.485499-36.469131c20.170038-20.147532 20.170038-52.805051 0-72.953606l-43.623832-43.624855c10.504951-18.846306 18.765491-39.012252 24.781618-60.183784l62.18575 0c28.348739 0 51.32378-23.01596 51.32378-51.341171l0-51.303321C876.967512 470.331077 853.992472 447.376496 825.643732 447.376496zM492.085706 678.287984c-85.042126 0-153.968272-68.90364-153.968272-153.946789 0-85.043149 68.925123-153.948835 153.968272-153.948835 85.044172 0 153.968272 68.904663 153.968272 153.948835C646.053978 609.383321 577.129878 678.287984 492.085706 678.287984z"  ></path>' +
    '' +
    '</symbol>' +
    '' +
    '</svg>'
  var script = function() {
    var scripts = document.getElementsByTagName('script')
    return scripts[scripts.length - 1]
  }()
  var shouldInjectCss = script.getAttribute("data-injectcss")

  /**
   * document ready
   */
  var ready = function(fn) {
    if (document.addEventListener) {
      if (~["complete", "loaded", "interactive"].indexOf(document.readyState)) {
        setTimeout(fn, 0)
      } else {
        var loadFn = function() {
          document.removeEventListener("DOMContentLoaded", loadFn, false)
          fn()
        }
        document.addEventListener("DOMContentLoaded", loadFn, false)
      }
    } else if (document.attachEvent) {
      IEContentLoaded(window, fn)
    }

    function IEContentLoaded(w, fn) {
      var d = w.document,
        done = false,
        // only fire once
        init = function() {
          if (!done) {
            done = true
            fn()
          }
        }
        // polling for no errors
      var polling = function() {
        try {
          // throws errors until after ondocumentready
          d.documentElement.doScroll('left')
        } catch (e) {
          setTimeout(polling, 50)
          return
        }
        // no errors, fire

        init()
      };

      polling()
        // trying to always fire before onload
      d.onreadystatechange = function() {
        if (d.readyState == 'complete') {
          d.onreadystatechange = null
          init()
        }
      }
    }
  }

  /**
   * Insert el before target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var before = function(el, target) {
    target.parentNode.insertBefore(el, target)
  }

  /**
   * Prepend el to target
   *
   * @param {Element} el
   * @param {Element} target
   */

  var prepend = function(el, target) {
    if (target.firstChild) {
      before(el, target.firstChild)
    } else {
      target.appendChild(el)
    }
  }

  function appendSvg() {
    var div, svg

    div = document.createElement('div')
    div.innerHTML = svgSprite
    svgSprite = null
    svg = div.getElementsByTagName('svg')[0]
    if (svg) {
      svg.setAttribute('aria-hidden', 'true')
      svg.style.position = 'absolute'
      svg.style.width = 0
      svg.style.height = 0
      svg.style.overflow = 'hidden'
      prepend(svg, document.body)
    }
  }

  if (shouldInjectCss && !window.__iconfont__svg__cssinject__) {
    window.__iconfont__svg__cssinject__ = true
    try {
      document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>");
    } catch (e) {
      console && console.log(e)
    }
  }

  ready(appendSvg)


})(window)