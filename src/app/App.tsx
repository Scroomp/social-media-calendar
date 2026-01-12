import SocialMediaCalendar from './components/SocialMediaCalendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

export default function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="size-full">
        <SocialMediaCalendar />
      </div>
    </DndProvider>
  );
}
