MANIFEST	:= manifest.json
PACKAGE 	:= zendesk-quicktab.zip
ICONS		:= ./images/*
SOURCES		:= ./_locales/ ./_metadata/ ./javascripts/ ./stylesheets ./vendor/ popup.html welcome.html

.PHONY: all clean

all: $(PACKAGE)

$(PACKAGE): $(MANIFEST) $(ICONS) $(SOURCES) clean
	zip -r $(PACKAGE) $(MANIFEST) $(ICONS) $(SOURCES)

clean:
	rm -f $(PACKAGE)
