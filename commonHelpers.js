import{a as y,S as P,i as E}from"./assets/vendor-c493984e.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();y.defaults.baseURL="https://pixabay.com/api/";async function b(r,e){const o={key:"44431015-10991196da62062e34a604eda",q:r,image_type:"photo",orientation:"horizontal",safesearch:"true",per_page:15,page:e};try{const{data:s}=await y.get("",{params:o});return s}catch(s){console.log("server error",s)}}function M({webformatURL:r,largeImageURL:e,tags:o,likes:s,views:t,comments:a,downloads:i}){return`<li class="gallery-item"><a href="${e}" class="gallery-link"><img src="${r}" alt="${o}" class="gallery-img"/></a>
  <ul class="descr">
      <li class="descr-item">
        <p><b>Likes</b></p>
        <p>${s}</p>
      </li>
      <li class="descr-item">
        <p><b>Views</b></p>
        <p>${t}</p>
      </li>
      <li class="descr-item">
        <p><b>Comments</b></p>
        <p>${a}</p>
      </li>
      <li class="descr-item">
        <p><b>Downloads</b></p>
        <p>${i}</p>
      </li>
    </ul>
    </li>`}function L(r){return r.map(M).join("")}const u=document.querySelector(".form"),n=document.querySelector(".gallery"),v=document.querySelector(".loader"),p=document.querySelector(".loadmore-btn"),w=new P(".gallery a",{captions:!0,captionDelay:250,captionsData:"alt"});let d,c=1,h=1;const q=15;u.addEventListener("submit",x);async function x(r){if(r.preventDefault(),d=u.elements.search.value.trim(),d===""){n.innerHTML="",l("Please enter data for search","#ffa000");return}S(),g();try{c=1;const e=await b(d,c);if(h=Math.ceil(e.total/q),e.hits.length===0){n.innerHTML="",l("Sorry, there are no images matching your search query. Please try again!","#ef4040"),m(),f();return}else{const o=L(e.hits);n.innerHTML=o,w.refresh()}}catch{l("An error occurred while fetching photos. Please try again later.","#EF4040")}f(),m(),u.reset()}p.addEventListener("click",async()=>{c++,g(),S();try{const r=await b(d,c),e=L(r.hits);n.insertAdjacentHTML("beforeend",e),O()}catch{l("An error occurred while fetching photos. Please try again later.","#EF4040")}w.refresh(),m(),f()});function l(r,e){E.show({message:r,position:"topRight",backgroundColor:e,messageColor:"#fff",theme:"dark",maxWidth:"350px"})}function S(){v.classList.remove("visually-hidden")}function m(){v.classList.add("visually-hidden")}function B(){p.classList.remove("visually-hidden")}function g(){p.classList.add("visually-hidden")}function f(){c>=h?(g(),h&&l("We are sorry, but you have reached the end of search results.","#89CFF0")):B()}function O(){const e=n.children[0].getBoundingClientRect().height;scrollBy({top:e*3,behavior:"smooth"})}
//# sourceMappingURL=commonHelpers.js.map
