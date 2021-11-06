<template>
  <div class="hello">
   <h1>Pomodoro</h1>
   <section>
     <div class="timer">
        25:00
     </div>
   </section>
   <section class="button-pomodoro">
     <button>start</button>
     <button>stop</button>
   </section>
   <section>
     <h2>Todolist</h2>
   </section>
   <section class="list">
        <div>
          <input type="text">
        </div>
        <div>
          <input type="text">
        </div>
        <div>
          <input type="text">
        </div>
        <div>
          <input type="text">
        </div>
        <div>
          <input type="text">
        </div>
        <div>
          <input type="text">
        </div>
        <div>
          <input type="text">
        </div>
        
   </section>

  </div>
</template>

<script>
export default {
  name: "Pomodoro",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1{
  text-align: center;
  color: white;
}
.timer{
  color: white;
  font-size: 6em;
}

section{
  display:flex;
  justify-content: space-evenly;
}
section button{
    background:none;
    color:#ffa260;
    border: 2px solid;
    padding: 1em 2em;
    font-size: 1em;
    transition: color 0.25s, border-color 0.25s, box-shadow 0.25s, transform 0.25s;
}

section button:hover{
    border-color: #f1ff5c;
    color:white;
    box-shadow: 0 0.5em 0.5em -0.4em #f1ff5c;
    transform: translateY(-0.25em);
    cursor: pointer;
}
.list{
  display:flex;
  flex-direction: column;
  text-align: center;
}
.list div{
border: 2px solid orange;
padding: 3em 20em;
margin: 0 auto;
}
.list input{
  width: 100%;
}
</style>
