#!/bin/bash
echo ""
echo -e "--------------> \033[1mThank you for choosing our boilerplate! We'll begin installation right now :]\033[0m"
echo ""
echo "--------------> Downloading, unpacking and cleaning base code..."
echo ""
git clone https://github.com/CavalcanteLucas/todolist
cd todolist
echo ""
echo "--------------> Creating the python virtualenv..."
echo ""
python3 -m virtualenv venv
source venv/bin/activate

echo ""
echo "--------------> Installing python and js dependencies..."
echo ""
make install_dependencies

echo ""
echo "--------------> Setting up basic configuration for the django server..."
echo ""
cp env.example .env
python manage.py migrate

echo ""
echo -e "--------------> \033[1mDone! Now we'll run the app to check everything is running smoothly :]\033[0m"
sleep 2
echo "--------------> Running the app for the first time! Hit Ctrl+C or Command+C to interrupt."
echo ""
make run
