echo "Fast build started..."
sleep 2
rm -rf _cache docs
echo "Folders _cache and docs has been removed..."
sleep 1
stack --version
stack clean
echo "Building..."
stack build
sleep 1
stack exec site build
sleep 1
stack exec site rebuild
echo "Build finished successfully..."
echo "hit: stack exec site watch"




