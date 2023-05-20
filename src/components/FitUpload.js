export async function Upload (workout) {


        const response = await fetch('http://34.133.77.198/api/user/add-workout',{

            method: 'POST',
            body: JSON.stringify(workout),
            headers: {
                'Content-Type':'application/json'
            },
            credentials: 'include',

        }) 
        const json = await response.json()

        if (!response.ok){
            console.log(json.error)
        }

        if (response.ok){

            console.log("New Workout Added...")

        }
    }