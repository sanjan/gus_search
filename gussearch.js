function searchGUS(item, tab) {
  let urlstr = 'https://gus.my.salesforce.com/_ui/search/ui/UnifiedSearchResults?str=*' + item + '*';
  chrome.tabs.create({url: urlstr, index: tab.index + 1});
}

chrome.contextMenus.create({
    title: "Search \"%s\" in GUS", 
    contexts:["selection"], 
    onclick: function(info, tab) {
        searchGUS(info.selectionText,tab);
    }
});
