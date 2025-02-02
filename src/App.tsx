import './App.css'
import {Counter} from "./Components/Counter/Counter.tsx";
import {Button} from "./Components/Button/Button.tsx";

function App() {

  return (
    <>
        {/* Индикаторы без текста */}
        <Counter size={8} variants="primary" quantity="abcd" pulse/>
        <Counter size={12} variants="secondary" pulse/>

        {/* Индикаторы с текстом */}
        <Counter size={16} variants="primary"  quantity="222"/>
        <Counter size={20} variants="secondary" quantity="122"/>
        <Counter size={24} variants="primary"  quantity="aaa"/>
        <Counter size={24} variants="primary" quantity="A"/>

        <div style={{maxWidth: 150}}>

            <Button variants='primary' size={28}>
                <Button.Label>Hiw</Button.Label>
                <Button.Counter quantity='ac'/>
            </Button>

            <Button variants='secondary' size={36} state='pressed'>
                <Button.Label>Hi there</Button.Label>
                <Button.Counter quantity="a"/>
            </Button>

            <Button variants='secondary' size={36}>
                <Button.Label>Hq</Button.Label>
                <Button.Counter quantity="a"/>
            </Button>

            <Button variants='primary' size={56} state='loading'>
                <Button.Label>HI</Button.Label>
                <Button.Counter quantity="100"/>
            </Button>
        </div>

    </>
  )
}

export default App
