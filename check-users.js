import fetch from 'node-fetch'

async function checkUsers() {
  try {
    console.log('Checking users in database...')
    
    const response = await fetch('http://localhost:3000/api/profiles')
    const data = await response.json()
    
    console.log('Status:', response.status)
    console.log('Full response:', data)
    
    if (data.profiles) {
      console.log('Users found:', data.profiles.length)
      data.profiles.forEach((user, index) => {
        console.log(`User ${index + 1}:`, {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        })
      })
    } else {
      console.log('No profiles found or error occurred')
    }
    
  } catch (error) {
    console.error('Error:', error.message)
  }
}

checkUsers()
