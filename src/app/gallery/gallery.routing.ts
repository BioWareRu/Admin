import {Routes} from '@angular/router';
import {GalleryCatsListComponent} from './list/galleryCatList.component';
import {SettingsResolver} from '../../core/SettingsResolver';
import {GalleryCatFormComponent} from './form/galleryCatForm.component';


export const GalleryRoutes: Routes = [
    {
        path: '',
        children: [
            {
                path: 'cats',
                component: GalleryCatsListComponent
            },
            {
                path: 'cats/:id/edit',
                resolve: {settings: SettingsResolver},
                component: GalleryCatFormComponent
            },
            {
                path: 'cats/add',
                resolve: {settings: SettingsResolver},
                component: GalleryCatFormComponent
            }
        ]
    }
];
