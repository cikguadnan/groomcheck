const video=document.getElementById('video');
const scanBtn=document.getElementById('scanBtn');
const resetBtn=document.getElementById('resetBtn');
const cameraSwitch=document.getElementById('cameraSwitch');
const cameraCard=document.getElementById('cameraCard');
const resultCard=document.getElementById('resultCard');
const resultIcon=document.getElementById('resultIcon');
const resultTitle=document.getElementById('resultTitle');
const resultReason=document.getElementById('resultReason');
const cameraMessage=document.getElementById('cameraMessage');
const overrideActions=document.getElementById('overrideActions');
const teacherPass=document.getElementById('teacherPass');
const teacherConfirm=document.getElementById('teacherConfirm');
const checks={head:document.getElementById('headCheck'),fringe:document.getElementById('fringeCheck'),hair:document.getElementById('hairCheck')};
let stream=null;let facingMode='environment';let scanning=false;

async function startCamera(){
  if(stream) stream.getTracks().forEach(t=>t.stop());
  try{
    stream=await navigator.mediaDevices.getUserMedia({video:{facingMode:{ideal:facingMode},width:{ideal:1280},height:{ideal:1920}},audio:false});
    video.srcObject=stream;
    cameraMessage.innerHTML='<strong>Ready to scan</strong><span>Position one student\'s head inside the guide</span>';
  }catch(e){
    cameraMessage.innerHTML='<strong>Camera access needed</strong><span>Allow camera permission, then reload this page.</span>';
    scanBtn.disabled=true;
  }
}

function setCheck(el,state){el.textContent=state==='pass'?'✓':state==='review'?'!':'—';el.style.color=state==='pass'?'#34d399':state==='review'?'#f87171':'#94a3b8'}
function clearState(){
  cameraCard.classList.remove('pass','review');resultCard.className='result-card neutral';
  resultIcon.textContent='◎';resultTitle.textContent='Ready';resultReason.textContent='Centre the student\'s head, then tap Scan.';
  Object.values(checks).forEach(x=>setCheck(x,'neutral'));overrideActions.classList.add('hidden');resetBtn.classList.add('hidden');scanBtn.classList.remove('hidden');
  cameraMessage.innerHTML='<strong>Ready to scan</strong><span>Position one student\'s head inside the guide</span>';
}
function renderResult(pass,reason){
  const state=pass?'pass':'review';cameraCard.classList.add(state);resultCard.className=`result-card ${state}`;
  resultIcon.textContent=pass?'✓':'!';resultTitle.textContent=pass?'Looks acceptable':'Teacher check needed';resultReason.textContent=reason;
  setCheck(checks.head,'pass');setCheck(checks.fringe,pass?'pass':'review');setCheck(checks.hair,pass?'pass':'review');
  cameraMessage.innerHTML=pass?'<strong>✓ Grooming check passed</strong><span>Teacher may continue to next student</span>':'<strong>Possible grooming issue</strong><span>Please verify visually before deciding</span>';
  scanBtn.classList.add('hidden');resetBtn.classList.remove('hidden');if(!pass)overrideActions.classList.remove('hidden');
}
async function simulateScan(){
  if(scanning)return;scanning=true;scanBtn.disabled=true;scanBtn.textContent='Analysing…';
  cameraMessage.innerHTML='<strong>Analysing grooming…</strong><span>Keep the student's head inside the guide</span>';
  await new Promise(r=>setTimeout(r,1200));
  // V1 demo only. Replace this with real landmark / hair analysis in V2.
  const pass=Math.random()>.4;
  renderResult(pass,pass?'No obvious grooming issue detected in this V1 demo.':'Fringe or hair boundary may require a teacher check.');
  scanBtn.disabled=false;scanBtn.textContent='Scan student';scanning=false;
}
scanBtn.addEventListener('click',simulateScan);resetBtn.addEventListener('click',clearState);
cameraSwitch.addEventListener('click',async()=>{facingMode=facingMode==='environment'?'user':'environment';await startCamera()});
teacherPass.addEventListener('click',()=>{overrideActions.classList.add('hidden');cameraCard.classList.remove('review');cameraCard.classList.add('pass');resultCard.className='result-card pass';resultIcon.textContent='✓';resultTitle.textContent='Passed by teacher';resultReason.textContent='Teacher override recorded locally for this scan.';cameraMessage.innerHTML='<strong>✓ Teacher approved</strong><span>Ready to continue</span>'});
teacherConfirm.addEventListener('click',()=>{overrideActions.classList.add('hidden');resultTitle.textContent='Check confirmed';resultReason.textContent='Teacher confirmed that follow-up is required.';cameraMessage.innerHTML='<strong>Check confirmed</strong><span>Proceed according to school procedure</span>'});
startCamera();