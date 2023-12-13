let rowdata=document.getElementById('demo')
let search=document.getElementById('search')
let linkswidth=$(".nav-links").outerWidth()
// $(".nav-tab").css("left")== "-500px"
$(".nav-tab").animate({left:-linkswidth},0)


$('document').ready(()=>{
    mealapi("").then(()=>{
        $('.loading').fadeOut(300)
        $('body').css('overflow','visible')
        $('.inner-loading').fadeOut(300)

    })

    
})

$('#btn-close').click(()=>{
    
    if($(".nav-tab").css("left")== "0px"){
        $(".nav-tab").animate({left:-linkswidth},500)
        $("#btn-close").addClass("fa-bars")
        $("#btn-close").removeClass("fa-x")
        $(".links li").animate({top:500},500)
       

    }else{
        $(".nav-tab").animate({left:0},500)
        $("#btn-close").removeClass("fa-bars")
        $("#btn-close").addClass("fa-x")
        // $(".links li").eq(i).animate({top:0},500)
        for(let i=0;i<5;i++){
            $(".links li").eq(i).animate({top:0},(i+5)* 100)

        }
    
    }
})



async function mealapi(term){
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=`);
    let data= await (response.json())
    displaymeal(data.meals)
}
// mealapi("")
function displaymeal(arr){
    let cartona=``
    for(let i=0; i<arr.length; i++){
        cartona+=`
        <div  onclick="getmealdetails('${arr[i].idMeal}')" class="col-md-3">
                <div class="cursor-pointer meal position-relative overflow-hidden rounded-3">
                    <img class="w-100" src="${arr[i].strMealThumb}">
                    <div class="meal-layer position-absolute d-flex align-items-center">
                        <h3>${arr[i].strMeal}</h3>
                    </div>
                </div>
            </div>
        `
       rowdata.innerHTML=cartona;

    }
}


async function getcategors(){
    $('.inner-loading').fadeIn(300)
    $(".nav-tab").animate({left:-linkswidth},500)
    $("#btn-close").addClass("fa-bars")
    $("#btn-close").removeClass("fa-x")
    $(".links li").animate({top:500},500)
    search.innerHTML="";
    
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`);
    let data= (await response.json());
    displaycategors(data.categories)
    $('.inner-loading').fadeOut(300)

}
function displaycategors(arr){
    let cartona=``;
    for(let i=0;i<arr.length;i++){
        cartona+=`
        <div class="col-md-3">
                <div onclick="getcarsmeals('${arr[i].strCategory}')"  class="cursor-pointer meal position-relative overflow-hidden rounded-3">
                    <img class="w-100" src="${arr[i].strCategoryThumb}">
                    <div class="meal-layer position-absolute text-center">
                        <h3 class="text-center">${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription}
                        </p>
                    </div>
                </div>
            </div>
        `
       rowdata.innerHTML=cartona;

    }
}
// .split("").slice(0,150).join("")

    async function getcarsmeals(type){
        $('.inner-loading').fadeIn(300)
       
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${type}`);
        let data= await response.json();
        displaymeal(data.meals)
        $('.inner-loading').fadeOut(300)
    
    }

async function getarea(){
    $('.inner-loading').fadeIn(300)
    $(".nav-tab").animate({left:-linkswidth},500)
    $("#btn-close").addClass("fa-bars")
    $("#btn-close").removeClass("fa-x")
    $(".links li").animate({top:500},500)
    search.innerHTML="";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`);
    let data= (await response.json()).meals;
    displayarea(data)
    $('.inner-loading').fadeOut(300)

}
function displayarea(arr){
    let cartona=``;
    for(let i=0;i<arr.length;i++){
        cartona+=`
        <div onclick="getareasmeals('${arr[i].strArea}')" class="col-md-3 text-center">
                <div class="cursor-pointer meal position-relative overflow-hidden rounded-3">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
            </div>
        `
       rowdata.innerHTML=cartona;

    }

}


async function getareasmeals(type){
    $('.inner-loading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${type}`);
    let data= (await response.json());
    displaymeal(data.meals)
    $('.inner-loading').fadeOut(300)

}





async function getingredient(){
    
    $(".nav-tab").animate({left:-linkswidth},500)
    $("#btn-close").addClass("fa-bars")
    $("#btn-close").removeClass("fa-x")
    $(".links li").animate({top:500},500)
    $('.inner-loading').fadeIn(300)
    search.innerHTML="";

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`);
    let data= (await response.json());
    displayingredient(data.meals)
    $('.inner-loading').fadeOut(300)

}
function displayingredient(arr){
    let cartona=``;
    for(let i=0;i<arr.length;i++){
        cartona+=`
        <div class="col-md-3 text-center">
                <div onclick="getingredientsmeals('${arr[i].strIngredient}')" class="cursor-pointer meal position-relative overflow-hidden rounded-3">
                    <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                    <h3>${arr[i].strIngredient}</h3>
                    
                </div>
            </div>
        `
       rowdata.innerHTML=cartona;

    }

}
// <p>${arr[i].strDescription.split("").slice(0,20).join("")}</p>
async function getingredientsmeals(type){
    
    $('.inner-loading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${type}`);
    let data= (await response.json());
    displaymeal(data.meals)
    $('.inner-loading').fadeOut(300)
    

}





async function getmealdetails(type){
    search.innerHTML="";
    $('.inner-loading').fadeIn(300)
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${type}`);
    let data= (await response.json()).meals;
    displaydetails(data[0])
    $('.inner-loading').fadeOut(300)

}

function displaydetails(meal){
    let cartona=`
    <div class="col-md-4">
    <img class="w-100 rounded-3" src="${meal.strMealThumb}"
        alt="">
    <h3>${meal.strMeal}</h3>
</div>
<div class="col-md-8">
    <h2>Instructions</h2>
    <p>${meal.strInstructions}</p>
    <h3><span class="bold">Area : </span>${meal.strArea}</h3>
    <h3><span class="bold">Category : </span>${meal.strCategory}</h3>
    <h3><span class="bold">Recipes : </span>Jamaican</h3>

    <ul class="list-unstyled d-flex flex-wrap">
        <li class="alert alert-info m-2">1 whole Chicken</li>
        <li class="alert alert-info m-2">1 whole Chicken</li>
        <li class="alert alert-info m-2">1 whole Chicken</li>
        <li class="alert alert-info m-2">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
        <li class="alert alert-info m-2 ">1 whole Chicken</li>
    </ul>
    <h3><span class="bold">Tags : </span>Jamaican</h3>
    <ul class="list-unstyled">
        <li class="alert alert-danger">Stew</li>

    </ul>
    <ul class="list-unstyled d-flex">
        <a href="${meal.strSource}" class=" text-decoration-none alert-green alert me-2 ">Source</a>
        <a href="${meal.strYoutube}" class=" text-decoration-none alert-red alert me-2 ">Youtube</a>
    </ul>


</div>
    `
    rowdata.innerHTML=cartona;

}


function displaysearch(){
    $(".nav-tab").animate({left:-linkswidth},500)
    $("#btn-close").addClass("fa-bars")
    $("#btn-close").removeClass("fa-x")
    $(".links li").animate({top:500},500)
    search.innerHTML="";
    let cartona=`
            <div class="place row d-flex ">
                <div class="col-md-6 mt-3">
                    <input onkeyup="getbyname(this.value)" type="text" placeholder="text by name" class=" form-control bg-transparent text-white">
                </div>
                <div class="col-md-6 mt-3">
                    <input onkeyup="getbyletter(this.value)" type="text" placeholder="text by first letter" class="text-white form-control bg-transparent "maxlength="1" >
                </div>
            </div>
    `
    search.innerHTML=cartona;
    rowdata.innerHTML="";
}

 async function getbyname(mealname){
    $('.inner-loading').fadeIn(300)
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${mealname}`)
    response=  await response.json()
    response.meals ? displaymeal(response.meals) : displaymeal([])
    // displaymeal(response.meals)
    console.log ('done')
    $('.inner-loading').fadeOut(300)
}


async function getbyletter(mealname){
    $('.inner-loading').fadeIn(300)
   
    let response= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${mealname}`)
    response=  await response.json()
    response.meals ? displaymeal(response.meals) : displaymeal([])
    // displaymeal(response.meals)
    console.log ('done')
    $('.inner-loading').fadeOut(300)
}




function getcontact(){
    $('.inner-loading').fadeIn(300)
    $(".nav-tab").animate({left:-linkswidth},500)
    $("#btn-close").addClass("fa-bars")
    $("#btn-close").removeClass("fa-x")
    $(".links li").animate({top:500},500)
    search.innerHTML="";

    let cartona=`<div class="contact vh-100 d-flex align-items-center justify-content-center my-5">
    <div class="container w-75 d-flex align-items-center my-5">
        <div class="row g-4  te">
            <div class="col-md-6">
                <input id="nameinput" onkeyup="inputvalidation()" class="form-control" type="text" placeholder="enter your name">
                <div id="alertname" class=" d-none alert alert-danger w-100 mt-2">Special characters and numbers not allowed</div>
                </div>
            <div class="col-md-6">
                <input id="emailinput" onkeyup="inputvalidation()" class="form-control" type="text" placeholder="enter your email">
                <div id="alertemail" class=" d-none alert alert-danger w-100 mt-2">Email not valid *exemple@yyy.zzz</div>
                
                </div>
            <div class="col-md-6">
                <input id="phoneinput" onkeyup="inputvalidation()" class="form-control" type="text" placeholder="enter your phone">
                <div id="alertphone" class=" d-none alert alert-danger w-100 mt-2">Enter valid Phone Number</div>
                </div>
            <div class="col-md-6">
                <input id="ageinput" onkeyup="inputvalidation()" class="form-control" type="text" placeholder="enter your age">
                <div id="alertage" class=" d-none alert alert-danger w-100 mt-2">Enter valid age</div>
            </div>
            <div class="col-md-6">
                <input id="passwordinput" onkeyup="inputvalidation()" class="form-control" type="password" placeholder=" password">
                <div id="alertpassword" class=" d-none alert alert-danger w-100 mt-2">Enter valid password *Minimum eight characters, at least one letter and one number:*</div>

                </div>
            <div class="col-md-6">
                <input id="repasswordinput" onkeyup="inputvalidation()" class="form-control" type="password" placeholder="repassword ">
                <div id="alertrepassword" class=" d-none alert alert-danger w-100 mt-2">repassword in not match to password</div>

                </div>
            <div class="button text-center m-auto my-3">
                <button id="btn1" disabled class="btn btn-danger ">submit</button>
            </div>

        </div>

    </div>
</div>

    `
    
    rowdata.innerHTML=cartona;
    $('.inner-loading').fadeOut(300)

    document.getElementById('nameinput').addEventListener("focus",()=>{
        nametouched=true;
    })
    document.getElementById('emailinput').addEventListener("focus",()=>{
        emailtouched=true;
    })
    document.getElementById('phoneinput').addEventListener("focus",()=>{
        phonetouched=true;
    })
    document.getElementById('ageinput').addEventListener("focus",()=>{
        agetouched=true;
    })
    document.getElementById('passwordinput').addEventListener("focus",()=>{
        passwordtouched=true;
    })
    document.getElementById('repasswordinput').addEventListener("focus",()=>{
        repasswordtouched=true;
    })

    
}
let nametouched=false;
let emailtouched=false;
let phonetouched=false;
let agetouched=false;
let passwordtouched=false;
let repasswordtouched=false;


function inputvalidation(){

  if(nametouched){
    if(namevalidation()){
        //      document.getElementById('alert').classList.replace('d-block',"d-none")
                $("#alertname").addClass('d-none')
                $("#alertname").addClass('d-block')
                console.log('top')
    }else{
        //      document.getElementById('alert').classList.replace('d-none',"d-block")
                $("#alertname").addClass('d-block')
                $("#alertname").removeClass('d-none')
                console.log('bott')
    }
  }

    if(emailtouched){
        if(emailvalidation()){
            $("#alertemail").addClass('d-none')
            $("#alertemail").addClass('d-block')
           
         }else{
            $("#alertemail").addClass('d-block')
            $("#alertemail").removeClass('d-none')
        }
    }

    if(phonetouched){
        if(phonevalidation()){
            $("#alertphone").addClass('d-none')
            $("#alertphone").addClass('d-block')
        }else{
            $("#alertphone").addClass('d-block')
            $("#alertphone").removeClass('d-none')
        }
    }
  if(agetouched){
        if(agevalidation()){
            $("#alertage").addClass('d-none')
            $("#alertage").addClass('d-block')
        }else{
            $("#alertage").addClass('d-block')
            $("#alertage").removeClass('d-none')
        }
  }
   if(passwordtouched){
        if(passwordvalidation()){
            $("#alertpassword").addClass('d-none')
            $("#alertpassword").addClass('d-block')
        }else{
            $("#alertpassword").addClass('d-block')
            $("#alertpassword").removeClass('d-none')
        }
   }
   if(repasswordtouched){
        if(repasswordvalidation()){
            $("#alertrepassword").addClass('d-none')
            $("#alertrepassword").addClass('d-block')
        }else{
            $("#alertrepassword").addClass('d-block')
            $("#alertrepassword").removeClass('d-none')
        }
   }

    btn2=document.getElementById('btn1')
    if(namevalidation()&&
    emailvalidation()&&
    phonevalidation()&&
    agevalidation()&&
    passwordvalidation()&&
    repasswordvalidation()
    )
    {
        
        btn2.removeAttribute('disabled')
        console.log('yes')
    }else{
        btn2.setAttribute('disabled',true)
    }
  
}






function namevalidation(){
    return /^[a-zA-Z ]+$/.test($("#nameinput").val());
    
}
function emailvalidation(){
    return/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test( $('#emailinput').val());
}
function phonevalidation(){
    return /^(\+201|01|00201)[0-2,5]{1}[0-9]{8}$/.test($('#phoneinput').val())
    
}
function agevalidation(){
    return /^(0?[1-9]|[1-9][0-9]|[1][1-9][1-9]|200)$/.test($('#ageinput').val())
}
function passwordvalidation(){
    return /^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test($('#passwordinput').val())
}
function repasswordvalidation(){
    return ($('#passwordinput').val()) == ($('#repasswordinput').val())
}
