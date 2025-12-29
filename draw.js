// Canvas 繪圖功能
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('drawCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const brushColor = document.getElementById('brushColor');
  const brushSize = document.getElementById('brushSize');
  const sizeCircle = document.getElementById('sizeCircle');
  const clearBtn = document.getElementById('clearCanvas');
  const downloadBtn = document.getElementById('downloadCanvas');
  const colorBtn = document.querySelector('.color-btn');

  // 確保顏色選擇器預設為咖啡色
  if (brushColor) {
    brushColor.value = '#8b6f47';
  }

  // 更新顏色按鈕顯示
  function updateColorButton() {
    if (colorBtn && brushColor) {
      const colorBtnAfter = colorBtn.querySelector('::after') || colorBtn;
      if (colorBtnAfter.style) {
        colorBtnAfter.style.setProperty('--current-color', brushColor.value);
      }
      // 更新背景色
      colorBtn.style.background = brushColor.value;
    }
  }

  // 監聽顏色變化
  if (brushColor) {
    brushColor.addEventListener('input', updateColorButton);
    updateColorButton(); // 初始化
  }

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  // 設置畫布大小（高解析度）
  function resizeCanvas() {
    const wrapper = canvas.parentElement;
    const maxHeight = 500;
    const aspectRatio = 16 / 9; // 可以根據需要調整
    const scale = 2; // 2倍解析度
    
    if (wrapper) {
      const wrapperWidth = wrapper.clientWidth;
      const calculatedHeight = wrapperWidth / aspectRatio;
      const displayHeight = Math.min(calculatedHeight, maxHeight);
      
      // 設置顯示尺寸
      canvas.style.width = wrapperWidth + 'px';
      canvas.style.height = displayHeight + 'px';
      
      // 設置實際解析度（提高解析度）
      canvas.width = wrapperWidth * scale;
      canvas.height = displayHeight * scale;
      
      // 縮放繪圖上下文以匹配高解析度
      // 注意：設置 canvas.width/height 會重置 context，所以每次都要重新 scale
      ctx.scale(scale, scale);
      
      // 重新設置樣式
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, wrapperWidth, displayHeight);
      
      // 繪製 can.png 圖片
      drawCanImage();
      
      // 重新設置筆刷樣式
      if (brushColor && brushSize) {
        ctx.strokeStyle = brushColor.value;
        ctx.lineWidth = parseInt(brushSize.value);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }

  // 載入並繪製 can.png 圖片
  let canImage = null;
  let imageLoadedWithoutCORS = false; // 標記圖片是否在沒有 CORS 的情況下加載
  
  function loadCanImage() {
    return new Promise((resolve, reject) => {
      if (canImage) {
        resolve(canImage);
        return;
      }
      
      const img = new Image();
      // 只有在通過 HTTP/HTTPS 服務器訪問時才設置 crossOrigin
      // 本地文件（file://）不設置 crossOrigin，否則可能無法加載
      const isHTTP = window.location.protocol === 'http:' || window.location.protocol === 'https:';
      
      if (isHTTP) {
        img.crossOrigin = 'anonymous';
      }
      
      img.onload = function() {
        canImage = img;
        imageLoadedWithoutCORS = !isHTTP; // 記錄是否在沒有 CORS 的情況下加載
        resolve(img);
      };
      
      img.onerror = function() {
        // 如果設置 crossOrigin 失敗（可能是服務器不支持 CORS），嘗試不加 crossOrigin
        if (isHTTP && img.crossOrigin) {
          const img2 = new Image();
          img2.onload = function() {
            canImage = img2;
            imageLoadedWithoutCORS = true; // 標記為無 CORS 加載
            resolve(img2);
          };
          img2.onerror = function() {
            console.warn('無法加載 can.png 圖片');
            reject(new Error('Failed to load can.png'));
          };
          img2.src = 'img/can.png';
        } else {
          console.warn('無法加載 can.png 圖片');
          reject(new Error('Failed to load can.png'));
        }
      };
      
      img.src = 'img/can.png';
    });
  }
  
  function drawCanImage() {
    const wrapperWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 400;
    const displayHeight = Math.min(wrapperWidth / (16 / 9), 500);
    
    if (canImage) {
      // 圖片位置（右下角）
      const imgWidth = 180; // 圖片寬度
      const imgHeight = (canImage.height / canImage.width) * imgWidth; // 等比例高度
      const x = wrapperWidth - imgWidth - 50; // 距離右邊 50px
      const y = displayHeight - imgHeight - 50; // 距離底部 50px
      
      ctx.drawImage(canImage, x, y, imgWidth, imgHeight);
    } else {
      // 如果圖片還沒載入，先載入再繪製
      loadCanImage().then(() => {
        drawCanImage();
      }).catch(err => {
        console.error('Error loading can.png:', err);
      });
    }
  }
  
  // 預載入圖片
  loadCanImage();

  // 初始化畫布
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // 更新圓形大小和顏色
  function updateSizeCircle() {
    const size = parseInt(brushSize.value);
    if (sizeCircle) {
      sizeCircle.style.width = size + 'px';
      sizeCircle.style.height = size + 'px';
      sizeCircle.style.background = brushColor ? brushColor.value : '#8b6f47';
    }
  }

  // 更新顏色顯示
  function updateColorDisplay() {
    if (sizeCircle && brushColor) {
      sizeCircle.style.background = brushColor.value;
    }
  }

  // 初始化圓形大小
  updateSizeCircle();

  // 更新 range input 的填充顏色（WebKit 瀏覽器）
  function updateRangeFill() {
    if (brushSize) {
      const min = parseFloat(brushSize.min) || 2;
      const max = parseFloat(brushSize.max) || 20;
      const value = parseFloat(brushSize.value) || 6;
      const percent = ((value - min) / (max - min)) * 100;
      brushSize.style.setProperty('--fill-percent', percent + '%');
    }
  }

  // 監聽拉桿變化
  if (brushSize) {
    brushSize.addEventListener('input', function() {
      updateSizeCircle();
      updateRangeFill();
    });
    // 初始化填充顏色
    updateRangeFill();
  }

  // 監聽顏色變化
  if (brushColor) {
    brushColor.addEventListener('input', function() {
      updateColorDisplay();
      updateSizeCircle();
    });
  }

  // 獲取正確的畫布座標（高解析度）
  function getCanvasCoordinates(e) {
    const rect = canvas.getBoundingClientRect();
    
    let clientX, clientY;
    if (e.touches) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }
    
    // 計算相對於顯示區域的座標
    // 由於 ctx.scale(2, 2) 已經縮放了繪圖上下文，
    // 所以我們只需要使用顯示座標，上下文會自動處理縮放
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    return { x, y };
  }

  // 開始繪圖
  function startDrawing(e) {
    isDrawing = true;
    const coords = getCanvasCoordinates(e);
    lastX = coords.x;
    lastY = coords.y;
  }

  // 繪圖
  function draw(e) {
    if (!isDrawing) return;

    const coords = getCanvasCoordinates(e);
    const currentX = coords.x;
    const currentY = coords.y;

    ctx.strokeStyle = brushColor.value;
    ctx.lineWidth = parseInt(brushSize.value);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.beginPath();
    ctx.moveTo(lastX, lastY);
    ctx.lineTo(currentX, currentY);
    ctx.stroke();

    lastX = currentX;
    lastY = currentY;
  }

  // 停止繪圖
  function stopDrawing() {
    isDrawing = false;
  }

  // 事件監聽
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mousemove', draw);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseout', stopDrawing);

  // 觸控支援
  canvas.addEventListener('touchstart', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchmove', function(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
  });

  canvas.addEventListener('touchend', function(e) {
    e.preventDefault();
    const mouseEvent = new MouseEvent('mouseup', {});
    canvas.dispatchEvent(mouseEvent);
  });

  // 清除畫布
  if (clearBtn) {
    clearBtn.addEventListener('click', function() {
      const wrapperWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 400;
      const displayHeight = Math.min(wrapperWidth / (16 / 9), 500);
      
      ctx.fillStyle = '#fff';
      ctx.fillRect(0, 0, wrapperWidth, displayHeight);
      
      // 清除後不重新繪製圖片
    });
  }

  // 下載畫布
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // 獲取畫布尺寸
      const wrapperWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 400;
      const displayHeight = Math.min(wrapperWidth / (16 / 9), 500);
      const scale = 2; // 與原始 canvas 相同的縮放比例
      
      // 創建臨時 canvas 確保背景為白色
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      if (!tempCtx) {
        console.error('無法獲取 canvas context');
        alert('無法創建下載畫布');
        return;
      }
      
      // 設置臨時 canvas 的尺寸（使用實際解析度）
      tempCanvas.width = wrapperWidth * scale;
      tempCanvas.height = displayHeight * scale;
      tempCtx.scale(scale, scale);
      
      // 填充白色背景
      tempCtx.fillStyle = '#ffffff';
      tempCtx.fillRect(0, 0, wrapperWidth, displayHeight);
      
      // 如果圖片是在沒有 CORS 的情況下加載的，canvas 會被污染
      // 我們需要重新繪製內容，但不包含圖片
      if (imageLoadedWithoutCORS) {
        // 方法1：嘗試使用 getImageData（如果 canvas 沒被污染）
        try {
          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          // 創建一個新的 ImageData，只保留用戶繪製的內容
          const newImageData = tempCtx.createImageData(wrapperWidth * scale, displayHeight * scale);
          
          // 將原始 canvas 的像素數據複製到新 canvas（需要考慮縮放）
          for (let y = 0; y < displayHeight * scale; y++) {
            for (let x = 0; x < wrapperWidth * scale; x++) {
              const srcX = Math.floor(x / scale);
              const srcY = Math.floor(y / scale);
              const srcIdx = (srcY * canvas.width + srcX) * 4;
              const dstIdx = (y * wrapperWidth * scale + x) * 4;
              
              if (srcIdx < imageData.data.length) {
                newImageData.data[dstIdx] = imageData.data[srcIdx];     // R
                newImageData.data[dstIdx + 1] = imageData.data[srcIdx + 1]; // G
                newImageData.data[dstIdx + 2] = imageData.data[srcIdx + 2]; // B
                newImageData.data[dstIdx + 3] = imageData.data[srcIdx + 3]; // A
              }
            }
          }
          
          tempCtx.putImageData(newImageData, 0, 0);
        } catch (imageDataError) {
          // 如果 getImageData 也失敗，嘗試直接複製（可能會失敗）
          console.warn('無法使用 getImageData，嘗試直接複製:', imageDataError);
          try {
            tempCtx.drawImage(canvas, 0, 0, wrapperWidth, displayHeight);
          } catch (drawError) {
            console.error('無法複製 canvas 內容:', drawError);
            alert('下載失敗：canvas 被跨域圖片污染。\n\n解決方法：\n1. 使用 HTTP 服務器訪問此頁面（如 VS Code Live Server）\n2. 確保圖片服務器支持 CORS\n3. 或移除背景圖片後再下載');
            return;
          }
        }
      } else {
        // 圖片是通過 CORS 加載的，可以直接複製
        try {
          tempCtx.drawImage(canvas, 0, 0, wrapperWidth, displayHeight);
        } catch (drawError) {
          console.error('無法複製 canvas 內容:', drawError);
          alert('下載失敗：' + drawError.message);
          return;
        }
      }
      
      // 導出為 PNG（不透明，白色背景）
      try {
        const dataURL = tempCanvas.toDataURL('image/png');
        
        // 創建下載連結
        const link = document.createElement('a');
        link.download = 'canvas-drawing.png';
        link.href = dataURL;
        
        // 觸發下載
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (exportError) {
        console.error('導出圖片失敗:', exportError);
        alert('下載失敗：' + exportError.message + '\n\n請確保通過 HTTP 服務器訪問此頁面。');
      }
    });
  }
});
