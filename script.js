document.getElementById('convertForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);

  const response = await fetch('/convert', {
    method: 'POST',
    body: formData
  });

  const data = await response.json();
  if(data.success) {
    document.getElementById('result').innerHTML = 
      `<a href="${data.url}" download>Download MP3</a>`;
  } else {
    document.getElementById('result').textContent = 'Conversion failed.';
  }
});
