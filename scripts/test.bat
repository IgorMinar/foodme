@echo off

REM Windows script for running unit tests
REM
REM Requirements:
REM - NodeJS (http://nodejs.org/)
REM - Testacular (npm install -g testacular)

set BASE_DIR=%~dp0
node "%BASE_DIR%\..\node_modules\testacular\bin\testacular" start "%BASE_DIR%\..\config\testacular.conf.js" %*
