<template>
  <div class="header">
    <div class="inner-header">
        <p>版本号：2.0.1</p>
        <p>建站时间：2022.1.12</p>
        <p>github地址：https://github.com/1694871021/blog</p>
    </div>
    <div>
        <svg class="waves" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28" preserveAspectRatio="none" shape-rendering="auto">
        <defs>
            <path id="gentle-wave" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
        </defs>
        <g class="parallax">
            <use xlink:href="#gentle-wave" x="48" y="0" fill="rgba(255,255,255,0.7" />
            <use xlink:href="#gentle-wave" x="48" y="3" fill="rgba(255,255,255,0.5)" />
            <use xlink:href="#gentle-wave" x="48" y="5" fill="rgba(255,255,255,0.3)" />
            <use xlink:href="#gentle-wave" x="48" y="7" fill="#fff" />
        </g>
        </svg>
    </div>
  </div>
</template>
<script>
</script>
<style>
.header {
    background: linear-gradient(-45deg, rgba(84, 58, 183, 0.5), rgba(0, 172, 193, 0.5), #23a6d5, #23d5ab);
    background-size: 400% 400%;
    animation: gradient 15s ease infinite;
}

@keyframes gradient {
    0% {
        background-position: 0% 50%;
    }

    50% {
        background-position: 100% 50%;
    }

    100% {
        background-position: 0% 50%;
    }
}
/* .header {
    position: relative;
    background: linear-gradient(60deg, rgba(84, 58, 183, 0.5) 0%, rgba(0, 172, 193, 0.5) 100%);
    background: #FFAFBD;  
	background: -webkit-linear-gradient(to right, #ffc3a0, #FFAFBD);  
	background: linear-gradient(to right, #ffc3a0, #FFAFBD); 
} */
 
.inner-header {
    height: 10vh;
    width: 100%;
    font-size: 14px;
    color: #eee;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
}

.inner-header p {
    margin-left: 20px;
    letter-spacing: 1px;
}

.waves {
    position: relative;
    width: 100%;
    margin-bottom: -7px; /*Fix for safari gap*/
    min-height: 100px;
    max-height: 130px;
}

/* Animation */
 
.parallax > use {
    animation: move-forever 25s cubic-bezier(0.55, 0.5, 0.45, 0.5) infinite;
}
.parallax > use:nth-child(1) {
    animation-delay: -2s;
    animation-duration: 7s;
}
.parallax > use:nth-child(2) {
    animation-delay: -3s;
    animation-duration: 10s;
}
.parallax > use:nth-child(3) {
    animation-delay: -4s;
    animation-duration: 13s;
}
.parallax > use:nth-child(4) {
    animation-delay: -5s;
    animation-duration: 20s;
}
@keyframes move-forever {
    0% {
        transform: translate3d(-90px, 0, 0);
    }
    100% {
        transform: translate3d(85px, 0, 0);
    }
}
/*Shrinking for mobile*/
@media (max-width: 768px) {
    .waves {
        height: 40px;
        min-height: 40px;
    }
}
</style>