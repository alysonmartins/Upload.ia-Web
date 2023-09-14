import { Github , Wand2 } from 'lucide-react'
import { Button } from "./components/ui/button";
import { Separator } from './components/ui/separator';
import { Textarea } from './components/ui/textarea';
import { Label } from './components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './components/ui/select';
import { Slider } from './components/ui/slider';
import { VideoInputForm } from './components/video-input-form';
import { PromptSelect } from './components/prompt-select';
import { useState } from 'react';
import { useCompletion } from 'ai/react'

export function App() {

  const [temperature, setTemperature] = useState(0.5)
  const [videoId, setVideoId] = useState<string | null>(null)

  

  const {
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    completion,
    isLoading,
  } = useCompletion({
    api: 'http://localhost:3333/ai/complete',
    body: {
      videoId,
      temperature,
    },
    headers: {
      'Content-Type': 'application/json'
    }
  })


  return (
      <div className="min-h-screen flex flex-col">
        <div className="px-6 py-3 flex items-center justify-between border-b">
          <h1 className="text-xl font-bold">upload.AI</h1>

          <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Desenvolvido con ♥️ by Jack
          </span>

          <Separator orientation="vertical" className="h-6" />

          <Button variant={"outline"}>
            <Github className='w-4 h-4 mr-2'/>
            Github
          </Button>
         </div>
        </div>

        <main className='flex-1 p-6 flex gap-6'>
          <div className='flex flex-col flex-1 gap-4'>
            <div className='grid grid-rows-2 gap-4 flex-1'>

              <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder="Inclua o prompt para a IA.."
              value={input}
              onChange={handleInputChange}
              />
              <Textarea 
              className='resize-none p-4 leading-relaxed'
              placeholder="Resultado gerado pela IA..." 
              readOnly
              value={completion}
              />
              

            </div>
          <p className='text-sm text-muted-foreground'>
            Lembre-se: Você pode utilizar a variável <code className='text-violet-400'>{'{transcription}'}</code> no seu prompt para adicionar o conteúdo da transcrição do vídeo selecionado.</p>
          </div>




          <aside className='w-80 space-y-6'>
             
            <VideoInputForm onVideoUploaded={setVideoId}/>

            <Separator/>


            <form onSubmit={handleSubmit} className='space-y-4'>

              <div className='space-y-4'>
                <Label>Prompt</Label>
                <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                  Selecione o tipo de Prompt a ser executado
                </span>

                <PromptSelect onPromptSelected={setInput}/>

              </div>

              <Separator/>


              <div className='space-y-4'>
                <Label>Modelo</Label>
                <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                  Você podera custumizar esta opção em breve
                </span>

                <Select defaultValue='gpt3.5' disabled>
                  <SelectTrigger>
                    <SelectValue/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value='gpt3.5'> GPT 3.5-turbo 16k</SelectItem>
                  </SelectContent>
                </Select>

              </div>

              <Separator/>

              <div className='space-y-4'>
                <Label>Temperatura</Label>
                <span className='block text-xs text-muted-foreground italic leading-relaxed'>
                  Valores mais altos tendem a deixar o resultado mais criativo e com possiveis erros
                </span>

               <Slider min={0} max={1} step={0.1} 
               value={[temperature]}
               onValueChange={value => setTemperature(value[0])}
               />

              </div>

              <Separator/>
              <Button disabled={isLoading} type='submit' className='w-full'>
                Executar
                <Wand2 className='h-4 w-4 ml-2'/>
              </Button>

            </form>
          </aside>
        </main>
      </div>
  )
}