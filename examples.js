
  /* Замыканяе в Javascript

  Hello everyone, my name is Konstantin. In this presentation, I want to talk about closures in Javascript
    Всем привемт, меня зовут Константин.В данной презентации я хочу расказать о замыкания в Javascript.

slide #1
    Closure - is a function that remembers its outer variables and can access them.
  ** Замыкание - это функция, которая запоминает свои внешние переменные и может получить к ним доступ.

  Before delving into the meaning of closure, you should know about the hidden property of a function - scope
  Перед тем как углубится в значение замыкания, стоит знать о скрытом свойстве функции - scope.
  ----------------------------------------------------------------------------------------------------------------------------
slide #2 scope
//read text of slide 
Scope - it is a property of functions that records the chain of external environments of a function when it is created.
in general, we can say that
Each function, when created, receives a [[Scope]] link to an object with variables in the context of which it was created.
When the function starts, a new object with LexicalEnvironment variables is created. It gets a reference to an external
variable object from [[Scope]].
When searching for variables, it is carried out first in the current variable object, and then through this link.
----------------------------------------------------------------------------------------------------------------------------
slide #3 first example

When a function takes a variable not from its block, but accesses the scope property and searches for the requested
variable in the external blocks of the code, finding the first available requested variable, thereby creating a closure.
Когда функция берет переменную не из своего блока, а обращается к свойству scope и ищет во внешних блоках кода запрашиваемую переменную, найдя первую попавшуюся запрашиваемую переменную, тем самым создавая замыкание.

Let's look at a simple closure example.
Давайте рассмотрим простой пример замыканий

  var a = 50;
   function foo() {
      var a = 15;
      function bar() {
          console.log(a);
      }
      bar();
  }

  foo(); //15

  Despite the absence of a variable in the bar function, the value we need is still displayed. This example is possible due to the hidden property 
  of functions - scope.
  Не смотря на отсутствие переменной в функции bar, всё равно выводится нужное нам значение. Данный пример является возможным благодаря скрытом свойству функций - scope.
  Вот ещё один пример:
----------------------------------------------------------------------------------------------------------------------------
slide #4

function foo() {
    console.log(a);
}

 function baz() {
    var a = 10;
    foo();
 }

 baz(); //a is not defined

 As a result of the foo function, we will get an error - a is not defined. This tells us that the function takes 
 variables only from the scope chain, in which the context chain is written exactly when the function is created,
 rather than calling her.
 В результате выполнения функции foo у нас выведет ошибку - a is not defined. Это говорт нам о том, что функция берет переменные только из цепочки scope, в котором записывается цепь контекстов именно при создании функции,
 а не при её вызове.
 ----------------------------------------------------------------------------------------------------------------------------
 sldie #5

 function makeCounter() {
    var k = 1;

    return function() {
        return k++;
    }
}

var count = makeCounter();
var count2 = makeCounter();

console.log(count()); //1
console.log(count()); //2
console.log(count2()); //1
console.log(count2()); //2

This example demonstrates closure as the ability to create a private variable that will not be available outside 
the function. Therefore, accidentally changing the variable from the outside will fail.
We can also create copies of functions that are independent of each other, which, with each call, change only their variable,
 i.e. when copying a function, variables are also copied, they are not related to each other.

Данный пример демонстрирует замыкание, как возможность создания приватной переменной, которая будет не доступна вне функции. Поэтому случайно изменить переменную извне не получится.
Также мы можем создавать независимые друг от друга копии функций, которые при каждом вызове изменяют только свою переменную, т.е. при при копировании функции - копируются и переменные, они являются не связаны друг с другом.
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

 for (var i = 0; i < 3; i++) {
     setTimeout(function() {
         console.log(i)
    }, 0);
 }


Recognized by many, an example of a closure question. The problem with this example is that 
the function prints 3 times the number 3.
 This happens because in the context of the called function there is no variable i, therefore 
the function accesses its scope property and looks for the required variable i.
 But the next context of this function will be global, in which the variable i already has a finite 
value after the cycle, in this case 3.
 This is a feature of var. The fact is that var has a functional scope, therefore, in this example, 
the var variable is in a context external to the loop.
 To fix this, you can replace the var variable with the let variable, which has a block scope, 
and also at each loop iteration the variable has a new value.
 And you can also not replace the var variable with let, but create a context for the variable.

 Узнаваемый многими пример вопроса на замыкания. Проблема данного примера заключается в том, что функция выводит 3 раза число 3.
 Происходит это потому, что в контексте вызываемой функции нет переменной i, поэтому функция обращается к своему свойству scope, и ищет требуемую переменную i.
 Но следующим контекстом данной функциий будет глобальный, в котором переменная i уже имеется конечное значение после цикла, в данном случае - 3.
 Это особенность переменной var. Дело в том, что у var - функциональная область видимости, поэтому в данном примере переменная var находится во внешнем от цикла контексте.
 Чтобы это исправить, можно заменить переменную var на переменную let, которая имеет блочную область видимости, а также на каждой итерации цикла у переменной новое значени.
 А также можно и не заменять переменную var на let, но создать контекст для переменной.


 for (let i = 0; i &lt; 3; i++) {
	setTimeout(function() {console.log(i);}, 0);
}
// 0, 1 ,2

As I said earlier, if the variable is let, then everything will work out correctly.
Как я говорил ранее, если переменная будет let, то всё отработает верно.


for (var i = 0; i < 3; i++) {
     setTimeout(function(j) {
         console.log(j);
    }, 0, i);
 }

 In this case, we add the variable to the function as an argument. As a result of which, with each call to the function, the function will go to its scope, where it will find
 variable i every time, with a new value
 В данном случае мы добавляем переменную в функцию как аргумент. В следствии чего, при кажом вызове функции, функция будет обращаться в свой scope, где будет находить
 переменную i каждый раз, с новым значением
----------------------------------------------------------------------------------------------------------------------------
  let i = 0;
 while(i < 3) {
     (function(x) {setTimeout(() => console.log(x), 0);})(i)
     i++;
 } 
//3 3 3

This is a similar example, but with a different loop - while.
  In this example, we use the let variable, but it is located outside the loop, which means 
that this variable will not have values at each iteration of the loop.
  Therefore, only the final value of 3 will be saved.

 Это похожий пример, но с другим циклом - while.
 В данном примере мы используем переменную let, но она расположена вне цикла, а значит, что в данной переменной не будет значений на каждой итерации цикла.
 Поэтому в сохранится только конечное значение - 3.

let i = 0;
while(i <; 3) {
	setTimeout(function(j){console.log(j)}, 0, i);  
	i++;
}
//0, 1, 2

In this case, we can solve this problem as well as with var in the early example, namely, “catch” 
the values at each iteration of the loop, and pass it as an argument to the function.
В таком случае мы может решить эту проблему также, как и с var в раннем примере, а именно "отлавливать" значения на каждой итерации цикла, и передавать как аргумент в функцию.
 */