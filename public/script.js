// Manejo del formulario de registro
document.addEventListener('DOMContentLoaded', function () {
  const registroForm = document.getElementById('registroForm');
  const loginForm = document.getElementById('loginForm');

  // Manejar registro de usuario
  if (registroForm) {
    registroForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const nombre = document.getElementById('nombre').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/auth/registro', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ nombre, email, password })
        });

        const data = await response.json();

        if (response.ok) {
          alert('Registro exitoso. Ahora puedes iniciar sesión.');
          window.location.href = 'login.html';  // Redirigir al usuario a la página de inicio de sesión
        } else {
          document.getElementById('errorMsg').innerText = data.msg || 'Error al registrar el usuario';
        }
      } catch (error) {
        document.getElementById('errorMsg').innerText = 'Error al conectar con el servidor';
      }
    });
  }

  // Manejar inicio de sesión
  if (loginForm) {
    loginForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;

      try {
        const response = await fetch('/api/auth/iniciar-sesion', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (response.ok) {
          localStorage.setItem('token', data.token);
          alert('Inicio de sesión exitoso.');
          window.location.href = 'index.html';  // Redirigir a la página principal
        } else {
          document.getElementById('errorMsg').innerText = data.msg || 'Error al iniciar sesión';
        }
      } catch (error) {
        document.getElementById('errorMsg').innerText = 'Error al conectar con el servidor';
      }
    });
  }

  // aca tengo todos los campeones si estoy en la pagina principal
  if (window.location.pathname === '/index.html') {
    cargarCampeones();
  }
});

// cargo campeones desde la api
async function cargarCampeones() {
  const token = localStorage.getItem('token');

  if (!token) {
    alert('Inicia sesión para ver los campeones');
    return;
  }

  try {
    const response = await fetch('/api/campeones', {
      headers: {
        'x-auth-token': token
      }
    });

    if (response.ok) {
      const campeones = await response.json();
      displayCampeones(campeones);
    } else {
      alert('No se pudo obtener los campeones. Verifica que tienes acceso.');
    }
  } catch (error) {
    console.error('Error al acceder a la API', error);
    alert('Error al acceder a la API');
  }
}

// muestro los campeones desde la pagina
function displayCampeones(campeones) {
  const campeonesList = document.createElement('ul');
  campeones.forEach(campeon => {
    const campeonItem = document.createElement('li');
    campeonItem.textContent = campeon.nombre;  // ajusto al campo que quiero mostrar
    campeonesList.appendChild(campeonItem);
  });
  document.body.appendChild(campeonesList);  // agrega el cuerpo al html
}
