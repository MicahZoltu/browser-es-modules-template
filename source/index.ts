import 'knockout'
import { Main } from './main'

const main = new Main();

// keep a reference to Main on the window for debugging convenience
(window as any).main = main

ko.applyBindings(main)
