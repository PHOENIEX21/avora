import React from 'react';
import {createRoot} from 'react-dom/client';
import WeeklyWordBank from '../../components/WeeklyWordBank';
import '../../app/globals.css';
createRoot(document.getElementById('root')!).render(<WeeklyWordBank/>);
