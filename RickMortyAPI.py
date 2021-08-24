import requests    # Library that allows us to make requests to the server

total=0    # Initial value of the variables
alive=0
dead=0
unknown=0

def general():    # === Initial function ===
    global nombre
    nombre = input("\nIntroduce el nombre de un personaje: ")    # Get the value entered by the user and uses it as a parameter
    get_character()

def get_character(url = "https://rickandmortyapi.com/api/character/", page=1):    # === Main function ===
    args = {'name': nombre, 'page': page}    # Use a dictionary to indicate the corresponding parameters dynamically
    response = requests.get(url, params=args)    # Get the response of the request made to the definded URL
    if response.status_code != 200:    # If the character does not exist, repeat the initial function
        print("El nombre introducido no es válido.")    
        general()
    else:
        content = response.json()
        data = content.get('results',[0])    # Store the data obtained from the server's response in a variable
        if data:   
            for item in data:
                global alive,dead,unknown,total
                total+=1 
                name = item['name']    # Get the necessary data and display it by console
                print("\n--------------------")
                print("Name: "+str(name).upper())
                status = item['status']
                if status=="Alive":
                    print("Status: ✅ "+str(status).upper()+" ✅")
                    alive+=1
                elif status=="Dead":
                    print("Status: ❌ "+str(status).upper()+" ❌")
                    dead+=1
                else:
                    print("Status: ❔❔ "+str(status).upper()+" ❔❔")
                    unknown+=1
                print("--------------------")
            nextArgs = {'name': nombre, 'page': page+1}    # The API shows a limit of characters per page, so we go through all the pages to be able to show all the data
            nextResponse = requests.get(url, params=nextArgs)
            if nextResponse.status_code == 200:
                get_character(page=page+1)
            else:    # If we can't get more information about the character entered, show a total count and restart the whole process
                print("\nTOTAL COUNT: "+str(total)+" => ✅ Alive: "+str(alive)+"  // ❌ Dead: "+str(dead)+"  // ❔ Unknown: "+str(unknown))
                total=0
                alive=0
                dead=0
                unknown=0
                general()

general()