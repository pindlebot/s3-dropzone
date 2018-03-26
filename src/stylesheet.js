export default `
.s3-dropzone.drag {
  border-color: #ccc;
  background: #dbdbdb;
  background-image: -webkit-linear-gradient(-45deg,#d2d2d2 25%,transparent 25%,transparent 50%,#d2d2d2 50%,#d2d2d2 75%,transparent 75%,transparent);
  background-image: linear-gradient(-45deg,#d2d2d2 25%,transparent 25%,transparent 50%,#d2d2d2 50%,#d2d2d2 75%,transparent 75%,transparent);
  background-size: 40px 40px
}

.s3-dropzone figure:hover {
  transform: translateY(-2px);
  filter: grayscale(100%)
}

.thumbnail-overlay-icon svg {
  padding: 2px;
  border: 0.5px solid transparent;
  opacity: 0.6;
}

.thumbnail-overlay-icon svg:hover {
  opacity: 1;
  border: 0.5px solid #fff;
}

.spinner {
  top: 0;
  position: absolute;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.spinner > div {
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: sk-bouncedelay 1.4s infinite ease-in-out both;
  animation: sk-bouncedelay 1.4s infinite ease-in-out both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes sk-bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes sk-bouncedelay {
  0%, 80%, 100% { 
    -webkit-transform: scale(0);
    transform: scale(0);
  } 40% { 
    -webkit-transform: scale(1.0);
    transform: scale(1.0);
  }
}`
