::@echo off

:: publish netcore project
cd src/coreapi
dotnet restore
dotnet build
dotnet publish -r win10-x64 --output bin/dist/win

:: publish angular project
cd ../angularweb
::npm install
pause
ng build
pause

:: publish electron project
cd ../
npm install


npm start
