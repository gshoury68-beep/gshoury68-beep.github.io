document.getElementById('year').textContent = new Date().getFullYear();

// Simple UX: if user clicks the Calendly link, open in a new window with Calendly popup (if you have Calendly link)
// This is just a convenience; Calendly's widget.js handles inline embedding when you replace the link.
document.addEventListener('click', function(e){
  var el = e.target;
  if(el.tagName === 'A' && el.href && el.href.indexOf('calendly.com') !== -1){
    // open as a popup if Calendly widget is loaded
    window.open(el.href, '_blank', 'noopener');
  }
});
