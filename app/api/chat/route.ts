export async function POST(req: Request) {
  const { messages } = await req.json()
  
  // Get the last user message
  const lastMessage = messages[messages.length - 1]?.content?.toLowerCase() || ""
  
  // Simple response logic for common support scenarios
  let response = ""
  
  if (lastMessage.includes("login") || lastMessage.includes("password")) {
    response = "I can help you with login issues! Here are some steps to try:\n\n1. Check that you're using the correct email address\n2. Try resetting your password using the 'Forgot Password' link\n3. Clear your browser cache and cookies\n4. Try logging in from an incognito/private browser window\n\nIf none of these work, I can escalate this to our technical team. Would you like me to do that?"
  } else if (lastMessage.includes("payment") || lastMessage.includes("billing") || lastMessage.includes("charge")) {
    response = "I understand you have a payment-related question. Here's how I can help:\n\n1. Check your payment method is up to date\n2. Verify your billing address matches your card\n3. Ensure you have sufficient funds available\n4. Try using a different payment method\n\nFor specific billing questions or disputes, I'll connect you with our billing specialist. Would you like me to do that?"
  } else if (lastMessage.includes("error") || lastMessage.includes("bug") || lastMessage.includes("broken") || lastMessage.includes("not working")) {
    response = "I'm sorry you're experiencing technical difficulties. Let me help troubleshoot this:\n\n1. Try refreshing the page (Ctrl+F5 or Cmd+R)\n2. Check your internet connection\n3. Try disabling browser extensions temporarily\n4. Clear your browser cache\n5. Try using a different browser\n\nCan you tell me more about the specific error message you're seeing?"
  } else if (lastMessage.includes("account") || lastMessage.includes("settings") || lastMessage.includes("profile")) {
    response = "I can help you with account settings! Here are common account management tasks:\n\n1. Update your profile information in Settings > Profile\n2. Change notification preferences in Settings > Notifications\n3. Manage privacy settings in Settings > Privacy\n4. Update payment methods in Settings > Billing\n\nWhat specific account setting would you like help with?"
  } else if (lastMessage.includes("help") || lastMessage.includes("support")) {
    response = "I'm here to help! I can assist you with:\n\n✅ Login and password issues\n✅ Payment and billing questions\n✅ Technical troubleshooting\n✅ Account settings\n✅ Feature explanations\n\nWhat can I help you with today? Just describe your issue and I'll do my best to assist you!"
  } else if (lastMessage.includes("thank") || lastMessage.includes("thanks")) {
    response = "You're very welcome! I'm glad I could help. Is there anything else you need assistance with today? I'm here whenever you need support!"
  } else {
    response = "Thank you for contacting our support team! I'm here to help you with any questions or issues you might have.\n\nI can assist with:\n• Login and password problems\n• Payment and billing questions\n• Technical issues\n• Account settings\n\nPlease describe your issue in detail, and I'll provide you with the best solution. How can I help you today?"
  }
  
  // Create a simple stream response
  const stream = new ReadableStream({
    start(controller) {
      // Simulate typing delay
      const words = response.split(' ')
      let i = 0
      
      const sendWord = () => {
        if (i < words.length) {
          controller.enqueue(new TextEncoder().encode(words[i] + ' '))
          i++
          setTimeout(sendWord, 50) // Simulate typing speed
        } else {
          controller.close()
        }
      }
      
      setTimeout(sendWord, 100) // Initial delay
    }
  })
  
  return new Response(stream, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Transfer-Encoding': 'chunked',
    },
  })
}
