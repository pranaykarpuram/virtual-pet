class Food{
    constructor(){
         this.foodStock = 0;
        var lastFed;
        this.image = loadImage("images/Milk.png")
             
    }
    getFoodStock(){
        foodStock = database.ref('Food');
        foodStock.on("value",(data)=>{
           return this.foodStock = data.val();
        })
    }
    updateFoodStock(stock){
        database.ref('/').update({
            Food: stock
        });
    }
    deductFood(){
        if(this.foodStock > 0){
            this.foodStock = this.foodStock - 1;
        }
    }
    getFedTime(lastFed){
        this.lastFed = lastFed;
    }

    bedroom(){
        background(bedroom, 450, 450);
    }
    garden(){
        background(garden, 450, 450);
    }
    washroom(){
        background(washroom, 450, 450);
    }
    
    display(){
        var x = 35, y = 60;

        imageMode(CENTER);
        image(this.image, 500, 750, 70, 70);

        if (foodS != 0){
          for(var i = 0; i<foodS; i++){
              if(i%10 == 0){
                  x=35;
                  y=y+50;
              }
              image(this.image, x, y, 50, 50);
              x=x+30;
            }
          
        }
    }
}
