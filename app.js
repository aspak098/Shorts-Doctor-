const $=id=>document.getElementById(id);
let files=[],speechText="";
const images=$("images");

function progressWords(){
 const t=$("spoken").value;
 $("words").textContent=(t.trim()?t.trim().split(/\s+/).length:0)+" words";
 $("chars").textContent=t.length+" characters";
}
$("spoken").addEventListener("input",progressWords);

images.addEventListener("change",()=>{
 files=[...images.files].slice(0,10);
 $("preview").innerHTML="";
 files.forEach((f,i)=>{
  const d=document.createElement("div");d.className="thumb";
  const img=document.createElement("img");img.src=URL.createObjectURL(f);img.alt="Screenshot "+(i+1);
  const b=document.createElement("b");b.textContent=i+1;d.append(img,b);$("preview").appendChild(d);
 });
 $("count").textContent=files.length+" / 10";
});

$("theme").onclick=()=>document.body.classList.toggle("dark");

$("analyze").onclick=()=>{
 const spoken=$("spoken").value.trim(), topic=$("topic").value.trim()||"Not provided";
 const channel=$("channel").value.trim()||"Not provided",subs=$("subs").value||"Not provided";
 const oldV=$("oldViews").value||"Not provided",newV=$("newViews").value||"Not provided";
 const since=$("since").value||"Not provided",problem=$("problem").value.trim()||"Not provided";
 const changes=$("changes").value.trim()||"Not provided",extra=$("extra").value.trim()||"Not provided";
 const url=$("url").value.trim();

 $("report").innerHTML=`
 <h3>🔎 Shorts Doctor — Diagnosis Intake</h3>
 <div class="finding"><b>🟢 OBSERVED — Input received</b><br>
 Short link: ${url?"Provided":"Not provided"}<br>
 Spoken text: ${spoken?"Provided ("+spoken.split(/\\s+/).filter(Boolean).length+" words)":"Not provided"}<br>
 Screenshots: ${files.length}/10</div>
 <div class="finding"><b>📝 CONTENT CHECK</b><br>
 Topic: ${topic}<br>
 The production analysis should examine the supplied spoken text for the opening hook, topic clarity, claims, repetition, audience fit and other content signals. It should not invent anything not present in the text.</div>
 <div class="finding"><b>📊 ANALYTICS CHECK</b><br>
 The production vision/OCR layer should read relevant YouTube Studio screenshots and compare Shorts Feed exposure, viewed vs swiped away, retention, traffic sources and engagement with comparable previous Shorts.</div>
 <div class="finding"><b>📜 YOUTUBE GUIDANCE CHECK</b><br>
 Relevant current official YouTube guidance should be checked against the supplied content and evidence. A low view count alone is not proof of a policy issue or platform error.</div>
 <div class="finding"><b>🟡 LIKELY / POSSIBLE</b><br>
 The final AI backend should rank possible causes only after matching them to actual screenshot evidence and the creator's history. Each cause should show evidence and confidence.</div>
 <div class="finding"><b>👤 CHANNEL CONTEXT</b><br>
 ${channel} • ${subs} subscribers • Previous: ${oldV} views • Current: ${newV} views • Problem since: ${since}<br>
 Recent changes: ${changes}<br>Creator's problem: ${problem}<br>Extra observation: ${extra}</div>
 <p class="muted"><b>Production note:</b> This static build is the complete collection/report UI. Automatic screenshot reading, current policy retrieval and AI diagnosis require a secure backend/API; no fake analytics are generated here.</p>`;
 $("report").classList.remove("hidden");
 speechText=$("report").innerText;
};

$("speak").onclick=()=>{
 if(!speechText)return;
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(speechText);u.lang="hi-IN";u.rate=.95;speechSynthesis.speak(u);
};
$("stop").onclick=()=>speechSynthesis.cancel();
