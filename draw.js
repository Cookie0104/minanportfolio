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
      
      // 繪製預設幸運草插圖
      drawDefaultClover();
      
      // 重新設置筆刷樣式
      if (brushColor && brushSize) {
        ctx.strokeStyle = brushColor.value;
        ctx.lineWidth = parseInt(brushSize.value);
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }

  // 繪製預設幸運草插圖
  function drawDefaultClover() {
    const wrapperWidth = canvas.parentElement ? canvas.parentElement.clientWidth : 400;
    const displayHeight = Math.min(wrapperWidth / (16 / 9), 500);
    
    // 幸運草位置（右下角）
    const x = wrapperWidth - 60;
    const y = displayHeight - 60;
    const size = 40; // 幸運草大小
    
    ctx.save();
    ctx.translate(x, y);
    
    // 設置幸運草樣式
    ctx.fillStyle = 'rgba(139, 111, 71, 0.15)'; // 淡咖啡色
    ctx.strokeStyle = 'rgba(139, 111, 71, 0.3)';
    ctx.lineWidth = 1;
    
    // 繪製四片葉子（幸運草）
    const leafSize = size * 0.4;
    const centerX = 0;
    const centerY = 0;
    
    // 上葉子
    drawLeaf(ctx, centerX, centerY - leafSize * 0.5, leafSize, 0);
    // 下葉子
    drawLeaf(ctx, centerX, centerY + leafSize * 0.5, leafSize, Math.PI);
    // 左葉子
    drawLeaf(ctx, centerX - leafSize * 0.5, centerY, leafSize, Math.PI / 2);
    // 右葉子
    drawLeaf(ctx, centerX + leafSize * 0.5, centerY, leafSize, -Math.PI / 2);
    
    // 繪製莖
    ctx.beginPath();
    ctx.moveTo(centerX, centerY + leafSize * 0.3);
    ctx.lineTo(centerX, centerY + leafSize * 0.8);
    ctx.stroke();
    
    ctx.restore();
  }

  // 繪製單片葉子
  function drawLeaf(ctx, x, y, size, rotation) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    ctx.beginPath();
    // 繪製心形葉子
    ctx.moveTo(0, -size * 0.3);
    ctx.bezierCurveTo(
      -size * 0.3, -size * 0.3,
      -size * 0.4, 0,
      -size * 0.2, size * 0.2
    );
    ctx.bezierCurveTo(
      0, size * 0.3,
      size * 0.2, size * 0.2,
      size * 0.2, 0
    );
    ctx.bezierCurveTo(
      size * 0.2, -size * 0.2,
      size * 0.3, -size * 0.3,
      0, -size * 0.3
    );
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.restore();
  }

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

  // 監聽拉桿變化
  if (brushSize) {
    brushSize.addEventListener('input', function() {
      updateSizeCircle();
    });
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
      
      // 重新繪製幸運草
      drawDefaultClover();
    });
  }

  // 下載畫布
  if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
      const dataURL = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'canvas-drawing.png';
      link.href = dataURL;
      link.click();
    });
  }
});
