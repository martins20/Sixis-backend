import { container } from 'tsyringe';

import IValidationProvider from './ValidationProvider/models/IValidationProvider';

import YupValidationProvider from './ValidationProvider/implementations/YupValidationProvider';

container.registerSingleton<IValidationProvider>(
    'UserValidationProvider',
    YupValidationProvider,
);
