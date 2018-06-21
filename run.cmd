::@echo off

:: publish netcore project
cd src/coreapi
dotnet restore
dotnet build
dotnet publish -r win10-x64 --self-contained --output bin/dist/win

:: publish angular project
cd ../angularweb
:: npm install

cmd /c ng build --base-href ./


:: publish electron project
cd ../
:: CMD /C npm install

cmd /c npm start
