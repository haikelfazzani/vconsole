export default function CsIframe (jsvalue) {
  
  return `${style}

<ul id="dp"></ul>

<script>
  var ulElement = document.getElementById('dp');
  var origLog = console.log;
  var consoleBuffer = [];

  window.onerror = function (msg, url, lineNo, columnNo, error) {
    var message = [
      'Message: ' + msg ,
      '<br>Line: ' + (lineNo-31) ,
      '<br>Column: ' + columnNo ,
      '<br>Error object: ' + JSON.stringify(error)
    ].join(' ');
    ulElement.innerHTML += ('<li><pre style="color: #f58771">'+ message +'</pre></li>');
    return false;
  };

  console.log = function () {
    var args = Array.prototype.slice.call(arguments);
    if (consoleBuffer.length === 50) consoleBuffer.pop();
    consoleBuffer.push(args);
    origLog.apply(console, args);
  };
  
  ${jsvalue}  

  setTimeout(()=>{
    let fv = consoleBuffer.flat();
    for(let i = 0; i < fv.length ;i++) {
      if (typeof fv[i] === 'object') {
        ulElement.innerHTML += '<li><pre style="color: #ffd451">'+ JSON.stringify(fv[i], null, 2) +'</pre></li>';
      }
      else ulElement.innerHTML += '<li><pre style="color: #c7866e">'+ fv[i] +'</pre></li>';
    }
  },1200)
</script>`;
}

const style = `<style>
body { color: #fff; font-size: 16px; }
#dp { margin:0; list-style:none; width:100%; padding:0; }
#dp  li { padding:0 15px;  word-break: break-all; }
pre {
  white-space: pre-wrap;
  word-wrap: break-word; 
}
</style>`;
