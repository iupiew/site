rm -rf _cache docs
stack clean
stack build
stack exec site build
stack exec site rebuild
echo "hit: stack exec site watch"




