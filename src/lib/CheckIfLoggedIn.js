export async function CheckIfLoggedIn()
{
    try {
        const res = await fetch('http://localhost:3000/token', { credentials: 'include' });
		let data = await res.json();	
		if (!data.success) throw new Error('Not authenticated');
        return true;
    }
    catch(error)
    {
        window.location.href = "http://localhost:5173/login";
        return false;
    }
}