// forms.js - Porsche Enquiry Validation + AJAX + Price logic
function showError(id, msg){
  let el = document.getElementById(id);
  if(el) el.innerText = msg;
}
function clearErrors(){
  document.querySelectorAll('.error').forEach(e=>e.innerText='');
}

document.getElementById('enquiryForm')?.addEventListener('submit', function(e){
  e.preventDefault();
  clearErrors();
  let valid = true;
  let name = this.name.value.trim();
  let email = this.email.value.trim();
  let phone = this.phone.value.trim();
  let service = this.service.value;
  let message = this.message.value.trim();

  if(name.length < 3){ showError('err-name','Need 3 letters'); valid=false; }
  if(!email.includes('@')){ showError('err-email','Valid email'); valid=false; }
  if(!/^0[0-9]{9}$/.test(phone)){ showError('err-phone','Use 0821234567'); valid=false; }
  if(!service){ showError('err-service','Select model'); valid=false; }
  if(message.length < 10){ showError('err-message','Message short'); valid=false; }
  if(!valid) return;

  let responseMsg = "";
  if(service=="911") responseMsg = `Thanks ${name}! 911 GT3 RS = R4,500,000. Available 14 days.`;
  else if(service=="Cayenne") responseMsg = `Thanks ${name}! Cayenne = R2,800,000. Available NOW.`;
  else if(service=="Taycan") responseMsg = `Thanks ${name}! Taycan = R3,200,000. Free charger.`;

  let btn = this.querySelector('button');
  btn.innerText = "Sending..."; btn.disabled=true;

  fetch('https://jsonplaceholder.typicode.com/posts',{
    method:'POST',
    body: JSON.stringify({name,email,phone,service,message}),
    headers:{'Content-type':'application/json'}
  })
  .then(r=>r.json())
  .then(d=>{
    document.getElementById('enquiryResponse').innerHTML = `<div style="color:green;border:1px solid green;padding:1rem">${responseMsg}<br>Ref #${d.id}</div>`;
    this.reset();
  })
  .catch(()=>{
    document.getElementById('enquiryResponse').innerHTML = `<div style="color:green">${responseMsg}</div>`;
  })
  .finally(()=>{ btn.innerText="Submit Enquiry"; btn.disabled=false; });
});