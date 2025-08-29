import fetch from 'node-fetch'

async function testLogin() {
  try {
    console.log('Testing login API with real user...')
    
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'in.empiseysocheata24@kit.edu.kh',
        password: 'testpassword' // You'll need to provide the actual password
      })
    })
    
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', data)
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

async function testAdminLogin() {
  try {
    console.log('\nTesting admin login API with real admin...')
    
    const response = await fetch('http://localhost:3000/api/auth/admin_login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'admin@example.com',
        password: 'adminpassword' // You'll need to provide the actual password
      })
    })
    
    const data = await response.json()
    console.log('Status:', response.status)
    console.log('Response:', data)
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

// Run tests
testLogin()
testAdminLogin()
