
function onLoad() {

  document.querySelector('#testevent').onclick = function() {
    alert('clicked')
  };

  // Here starts the bit for your content script
  var re = /(\d*[/-]*[A-z]{1,3}-[0-9]{5}[ ]*)/g;
  var regs;

  var walker = document.createTreeWalker(
  document.body, NodeFilter.SHOW_TEXT, function(node) {
    if((regs = re.exec(node.textContent))) {
      // make sure the text nodes parent doesnt have an attribute we add to know its allready been highlighted
      if(!node.parentNode.classList.contains('highlighted_text')) {
        var match = document.createElement('A');
        match.appendChild(document.createTextNode(regs[0]));
        match.href = 'http://www.google.com';

        // add an attribute so we know this element is one we added
        // Im using a class so you can target it with css easily
        match.classList.add('highlighted_text');

        var after = node.splitText(regs.index);
        after.nodeValue = after.nodeValue.substring(regs[0].length);
        node.parentNode.insertBefore(match, after);
      }
    }
    return NodeFilter.FILTER_SKIP;
  }, false);

  // Make the walker step through the nodes
  walker.nextNode();

  // and it ends here
}

(function() {
  document.addEventListener("DOMContentLoaded", onLoad);
})();


// Set up context menu at install time.
chrome.runtime.onInstalled.addListener(function() {
  var context = "selection";
  var title = "Search this in GUS";
  var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});  
});

// add click event
chrome.contextMenus.onClicked.addListener(onClickHandler);

// The onClicked callback function.
function onClickHandler(info, tab) {
  var sText = info.selectionText;
  var url = "https://gus.my.salesforce.com/_ui/search/ui/UnifiedSearchResults?str=" + encodeURIComponent(sText);  
  window.open(url, '_blank');
};

